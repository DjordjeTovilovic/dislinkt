import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class PostRepository {
  constructor(private readonly neo4jService: Neo4jService) {}

  async create(createPostDto: CreatePostDto, username) {
    const res = await this.neo4jService.write(
      `
      MATCH (u:User {username: $username})
  
      WITH u, randomUUID() AS uuid
  
      CREATE (p:Post {
          id: uuid,
          createdAt: datetime(),
          updatedAt: datetime()
      }) SET p += $post
  
      CREATE (u)-[:POSTED]->(p)
  
      RETURN u,
          p
      `,
      {
        username,
        post: createPostDto,
      },
    );

    const row = res.records[0];
    return new Post(row.get('p'), username, 0, false, 0, false, []).toJson();
  }

  async userFeed(username) {
    const res = await this.neo4jService.read(
      `
        MATCH (u:User {username: $username})
        MATCH (p:Post)
        MATCH (a:User)
        WHERE (p)-[:POSTED]-(a)<-[:FOLLOWS]-(u)
        
        RETURN
          p,
          [ (c)-[:ON]-(p) | c ] AS comments,
          [ (c)-[:COMMENTED]-(ca) | ca ][0] AS commentAuthor,
          CASE
              WHEN $username IS NOT NULL
              THEN exists((p)<-[:LIKED]-({username: $username}))
              ELSE false
          END AS liked,
          CASE
              WHEN $username IS NOT NULL
              THEN exists((p)<-[:DISLIKED]-({username: $username}))
              ELSE false
          END AS disliked,
          [ (p)<-[:POSTED]-(a) | a ][0] AS author,
          size((p)<-[:LIKED]-()) AS likeCount,
          size((p)<-[:DISLIKED]-()) AS dislikeCount
`,
      {
        username,
      },
    );

    const posts = res.records.map((row) => {
      const authorUsername = row.get('author').properties.username;
      // const comments = await this.getComments(row.get('p').properties.id);
      // const comments = row.get('comments').map((comment) => {
      //   return new Comment(
      //     comment,
      //     // postId,
      //     row.get('p').properties.id,
      //     row.get('commentAuthor').properties.username,
      //     row.get('author').properties.username,
      //   ).toJson();
      // });
      return new Post(
        row.get('p'),
        authorUsername,
        row.get('likeCount'),
        row.get('liked'),
        row.get('dislikeCount'),
        row.get('disliked'),
        [],
        // comments,
      ).toJson();
    });
    // console.log(posts[0].comments[0]);
    // console.log(posts);
    return { posts };
  }

  async findByUserId(userId, username) {
    const res = await this.neo4jService.read(
      `
        MATCH (u:User {id: $userId})
        MATCH (p:Post)
        WHERE (p)<-[:POSTED]-(u)

        RETURN
          p,
          CASE
              WHEN $username IS NOT NULL
              THEN exists((p)<-[:LIKED]-({username: $username}))
              ELSE false
          END AS liked,
          CASE
              WHEN $username IS NOT NULL
              THEN exists((p)<-[:DISLIKED]-({username: $username}))
              ELSE false
          END AS disliked,
          [ (p)<-[:POSTED]-(u) | u ][0] AS author,
          size((p)<-[:LIKED]-()) AS likeCount,
          size((p)<-[:DISLIKED]-()) AS dislikeCount
`,
      {
        userId,
        username,
      },
    );

    const posts = res.records.map((row) => {
      const authorUsername = row.get('author').properties.username;

      return new Post(
        row.get('p'),
        authorUsername,
        row.get('likeCount'),
        row.get('liked'),
        row.get('dislikeCount'),
        row.get('disliked'),
        [],
      ).toJson();
    });
    console.log(posts);
    return { posts };
  }

  async getComments(postId) {
    const res = await this.neo4jService.read(
      `
        MATCH (p:Post {id: $postId})
        MATCH (c:Comment)
        WHERE (c)-[:ON]->(p)

        
        RETURN c,
        [ (c)-[:COMMENTED]-(ca) | ca ][0] AS commentAuthor,
        [ (p)-[:POSTED]-(a) | a ][0] AS author
    `,
      {
        postId,
      },
    );

    if (!res.records.length) return null;
    const comments = res.records.map((row) => {
      return new Comment(
        row.get('c'),
        postId,
        row.get('commentAuthor').properties.username,
        row.get('author').properties.username,
      ).toJson();
    });
    return { comments };
  }

  async comment(postId, body, username) {
    const res = await this.neo4jService.write(
      `
        MATCH (p:Post {id: $postId})
        MATCH (u:User {username: $username})
        MATCH (a:User)
        WHERE (p)<-[:POSTED]-(a)

        CREATE (u)-[:COMMENTED]->(c:Comment {
            id: randomUUID(),
            createdAt: datetime(),
            updatedAt: datetime(),
            body: $body
        })-[:ON]->(p)

        RETURN c, u, a
    `,
      {
        postId,
        body,
        username,
      },
    );

    const row = res.records[0];
    return new Comment(
      row.get('c'),
      postId,
      username,
      row.get('a').properties.username,
    ).toJson();
  }

  async like(postId, username) {
    const res = await this.neo4jService.write(
      `
      MATCH (p:Post {id: $postId})
      MATCH (u:User {username: $username})

      MERGE (u)-[l:LIKED]->(p)
      ON CREATE SET l.createdAt = datetime()

      RETURN 
        p,
        [ (p)<-[:POSTED]-(a) | a ][0] AS author,
        CASE
            WHEN $username IS NOT NULL
            THEN exists((p)<-[:LIKED]-({username: $username}))
            ELSE false
        END AS liked,
        CASE
            WHEN $username IS NOT NULL
            THEN exists((p)<-[:DISLIKED]-({username: $username}))
            ELSE false
        END AS disliked,
        size((p)<-[:LIKED]-()) AS likeCount,
        size((p)<-[:DISLIKED]-()) AS dislikeCount
      `,
      {
        postId,
        username,
      },
    );
    const row = res.records[0];
    const authorUsername = row.get('author').properties.username;

    return new Post(
      row.get('p'),
      authorUsername,
      row.get('likeCount'),
      row.get('liked'),
      row.get('dislikeCount'),
      row.get('disliked'),
      [],
    ).toJson();
  }

  async dislike(postId, username) {
    const res = await this.neo4jService.write(
      `
      MATCH (p:Post {id: $postId})
      MATCH (u:User {username: $username})

      MERGE (u)-[d:DISLIKED]->(p)
      ON CREATE SET d.createdAt = datetime()

      RETURN 
        p,
        [ (p)<-[:POSTED]-(a) | a ][0] AS author,
        CASE
            WHEN $username IS NOT NULL
            THEN exists((p)<-[:LIKED]-({username: $username}))
            ELSE false
        END AS liked,
        CASE
            WHEN $username IS NOT NULL
            THEN exists((p)<-[:DISLIKED]-({username: $username}))
            ELSE false
        END AS disliked,
        size((p)<-[:LIKED]-()) AS likeCount,
        size((p)<-[:DISLIKED]-()) AS dislikeCount
      `,
      {
        postId,
        username,
      },
    );
    const row = res.records[0];
    const authorUsername = row.get('author').properties.username;

    return new Post(
      row.get('p'),
      authorUsername,
      row.get('likeCount'),
      row.get('liked'),
      row.get('dislikeCount'),
      row.get('disliked'),
      [],
    ).toJson();
  }

  async deleteAllForUserId(userId) {
    const res = await this.neo4jService.write(
      `
      MATCH (u:User {id: $userId})
      MATCH (p:Post)
      WHERE (p)<-[:POSTED]-(u)

      SET p.deletedAt = localdatetime()


      `,
      {
        userId,
      },
    );
    // const posts = res.records.map((row) => {
    //   const authorUsername = row.get('author').properties.username;

    //   return new Post(
    //     row.get('p'),
    //     authorUsername,
    //     row.get('likeCount'),
    //     row.get('liked'),
    //     row.get('dislikeCount'),
    //     row.get('disliked'),
    //   ).toJson();
    // });
    // console.log({ posts });
    // return { posts };
  }
}
