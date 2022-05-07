import { Node } from 'neo4j-driver';
import { PostDto } from '../dto/post.dto';

export class Post {
  constructor(
    private readonly post: Node,
    private readonly authorUsername: string,
    private readonly likeCount: number,
    private readonly liked: boolean,
    private readonly dislikeCount: number,
    private readonly disliked: boolean,
  ) {}

  toJson(): PostDto {
    const { title, description, body } = this.post.properties;
    return {
      title,
      description,
      body,
      authorUsername: this.authorUsername,
      likeCount: this.likeCount,
      liked: this.liked,
      dislikeCount: this.dislikeCount,
      disliked: this.disliked,
    };
  }
}
