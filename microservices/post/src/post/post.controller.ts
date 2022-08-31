import { Controller, Logger } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import {
  FindByUserIdRequest,
  PostServiceController,
  PostServiceControllerMethods,
} from '../protos/post.pb';
import { Metadata } from '@grpc/grpc-js';

@Controller()
@PostServiceControllerMethods()
export class PostController implements PostServiceController {
  constructor(private readonly postService: PostService) {}
  private readonly logger = new Logger(PostController.name);

  async create(createPostDto: CreatePostDto, metadata: Metadata) {
    const username = metadata.get('username')[0];
    return this.postService.create(createPostDto, username);
  }

  async userFeed({}, metadata?: Metadata) {
    const username = metadata.get('username')[0];
    return this.postService.userFeed(username);
  }

  async getComments({ postId }) {
    return this.postService.getComments(postId);
  }

  async findByUserId(user: FindByUserIdRequest, metadata?: Metadata) {
    const username = metadata.get('username')[0];
    return this.postService.findByUserId(user.userId, username);
  }

  async comment(comment, metadata?: Metadata) {
    const username = metadata.get('username')[0];
    return this.postService.comment(comment.postId, comment.body, username);
  }

  async like(post, metadata?: Metadata) {
    const username = metadata.get('username')[0];
    return this.postService.like(post.postId, username);
  }

  async dislike(post, metadata?: Metadata) {
    const username = metadata.get('username')[0];
    return this.postService.dislike(post.postId, username);
  }
}
