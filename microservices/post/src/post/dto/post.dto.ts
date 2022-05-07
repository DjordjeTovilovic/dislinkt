import { PostProto } from '../../protos/post.pb';
import { IsNotEmpty } from 'class-validator';

export class PostDto implements PostProto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  authorUsername: string;

  likeCount: number;
  liked: boolean;
  dislikeCount: number;
  disliked: boolean;
}
