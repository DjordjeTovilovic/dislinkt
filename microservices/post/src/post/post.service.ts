import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(createPostDto: CreatePostDto, username) {
    const post = await this.postRepository.create(createPostDto, username);
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
    return like;
  }

  async dislike(postId, username) {
    const dislike = await this.postRepository.dislike(postId, username);
    return dislike;
  }
}
