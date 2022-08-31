import { CommentProto } from '../../protos/post.pb';
import { IsNotEmpty } from 'class-validator';

export class CommentDto implements CommentProto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  createdAt: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  postId: string;

  @IsNotEmpty()
  authorUsername: string;

  @IsNotEmpty()
  postAuthorUsername: string;
}
