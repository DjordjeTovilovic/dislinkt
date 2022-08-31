import { Node } from 'neo4j-driver';
import { CommentDto } from '../dto/comment.dto';

export class Comment {
  constructor(
    private readonly comment: Node,
    private readonly postId: string,
    private readonly authorUsername: string,
    private readonly postAuthorUsername: string,
  ) {}

  toJson(): CommentDto {
    const { body } = this.comment.properties;
    return {
      body,
      postId: this.postId,
      authorUsername: this.authorUsername,
      postAuthorUsername: this.postAuthorUsername,
    };
  }
}
