import { Node } from 'neo4j-driver';
import { CommentDto } from '../dto/comment.dto';
import { PostDto } from '../dto/post.dto';

export class Post {
  constructor(
    private readonly post: Node,
    private readonly authorUsername: string,
    private readonly likeCount: number,
    private readonly liked: boolean,
    private readonly dislikeCount: number,
    private readonly disliked: boolean,
    private readonly comments: CommentDto[],
  ) {}

  toJson(): PostDto {
    const { id, title, description, body, createdAt } = this.post.properties;
    return {
      id,
      title,
      description,
      body,
      createdAt,
      authorUsername: this.authorUsername,
      likeCount: this.likeCount,
      liked: this.liked,
      dislikeCount: this.dislikeCount,
      disliked: this.disliked,
      comments: this.comments,
    };
  }
}
