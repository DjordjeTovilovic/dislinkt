import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    @Inject('USER_SERVICE') private userClient: ClientProxy,
    @Inject('NOTIFICATION_SERVICE') private notificationClient: ClientProxy,
  ) {}
  private readonly logger = new Logger(PostService.name);

  async create(createPostDto: CreatePostDto, username) {
    const post = await this.postRepository.create(createPostDto, username);
    return post;
  }

  async userFeed(username) {
    const posts = await this.postRepository.userFeed(username);
    await Promise.all(
      posts.posts.map(async (post) => {
        const { comments } = await this.getComments(post.id);
        post.comments = comments;
      }),
    );
    return posts;
  }

  async getComments(postId) {
    const posts = await this.postRepository.getComments(postId);
    return posts;
  }

  async findByUserId(userId, username) {
    const posts = await this.postRepository.findByUserId(userId, username);
    await Promise.all(
      posts.posts.map(async (post) => {
        const { comments } = await this.getComments(post.id);
        post.comments = comments;
      }),
    );
    return posts;
  }

  async comment(postId, body, username) {
    const commentedPost = await this.postRepository.comment(
      postId,
      body,
      username,
    );

    const payload = {
      postId,
      type: 'commented',
      senderUsername: username,
      receiverUsername: commentedPost.postAuthorUsername,
    };
    this.logger.log('post_commented#emit');
    this.notificationClient.emit('post_commented', payload);

    return commentedPost;
  }

  async like(postId, username) {
    const likedPost = await this.postRepository.like(postId, username);

    const payload = {
      postId,
      type: 'liked',
      senderUsername: username,
      receiverUsername: likedPost.authorUsername,
    };
    this.logger.log('post_liked#emit');
    this.notificationClient.emit('post_liked', payload);

    return likedPost;
  }

  async dislike(postId, username) {
    const dislikedPost = await this.postRepository.dislike(postId, username);

    const payload = {
      postId,
      type: 'disliked',
      senderUsername: username,
      receiverUsername: dislikedPost.authorUsername,
    };
    this.logger.log('post_disliked#emit');
    this.notificationClient.emit('post_disliked', payload);

    return dislikedPost;
  }

  async deleteAllForUserId(userId) {
    try {
      await this.postRepository.deleteAllForUserId(userId);
      this.userClient.emit('user_posts_deleted', { userId });
      this.logger.log('user_posts_deleted#emited');
    } catch (error) {
      this.logger.warn('deleteAllForUserId#error', error);
      this.userClient.emit('user_posts_delete_failed', { userId });
      this.logger.log('user_posts_delete_failed#emited');
    }
  }
}
