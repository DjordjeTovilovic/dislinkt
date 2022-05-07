import { CreatePostRequest } from '../../protos/post.pb';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto implements CreatePostRequest {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  body: string;
}
