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
    return new Post(row.get('p'), username, 0, false, 0, false).toJson();
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
      ).toJson();
    });
    console.log(posts);
    return { posts };
  }

  async comment(postId, body, username) {
    const res = await this.neo4jService.write(
      `
        MATCH (p:Post {id: $postId})
        MATCH (u:User {username: $username})

        CREATE (u)-[:COMMENTED]->(c:Comment {
            id: randomUUID(),
            createdAt: datetime(),
            updatedAt: datetime(),
            body: $body
        })-[:ON]->(p)

        RETURN c, u
    `,
      {
        postId,
        body,
        username,
      },
    );

    const row = res.records[0];
    return new Comment(row.get('c'), postId, username).toJson();
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
    ).toJson();
  }
}
