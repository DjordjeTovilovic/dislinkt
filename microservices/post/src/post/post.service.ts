import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    @Inject('NOTIFICATION_SERVICE') private client: ClientProxy,
  ) {}
  private readonly logger = new Logger(PostService.name);

  async create(createPostDto: CreatePostDto, username) {
    const post = await this.postRepository.create(createPostDto, username);
    // this.logger.log('post_created.emit#body', post);
    // this.client.emit('post_created', post);
    return post;
  }

  async findByUserId(userId, username) {
    const posts = await this.postRepository.findByUserId(userId, username);
    return posts;
  }

  async comment(postId, body, username) {
    const comment = await this.postRepository.comment(postId, body, username);
    return comment;
  }

  async like(postId, username) {
    const like = await this.postRepository.like(postId, username);
    this.logger.log('post_liked.emit#payload', like);
    this.client.emit('post_liked', like);
    return like;
  }

  async dislike(postId, username) {
    const dislike = await this.postRepository.dislike(postId, username);
    return dislike;
  }
}
