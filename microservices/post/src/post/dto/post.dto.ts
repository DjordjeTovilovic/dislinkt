import { PostProto } from '../../protos/post.pb';
import { IsNotEmpty } from 'class-validator';
import { CommentDto } from './comment.dto';

export class PostDto implements PostProto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  image: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  authorUsername: string;

  likeCount: number;
  liked: boolean;
  dislikeCount: number;
  disliked: boolean;
  comments: CommentDto[];
  createdAt: string;
}
