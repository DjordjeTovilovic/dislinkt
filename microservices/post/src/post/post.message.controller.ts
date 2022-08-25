import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostService } from './post.service';

@Controller()
export class PostMessageController {
  constructor(private readonly postService: PostService) {}
  private readonly logger = new Logger(PostMessageController.name);

  @MessagePattern({ cmd: 'delete_user_posts' })
  async deleteUserPosts(@Payload() payload) {
    this.logger.log('Post#delete_user_posts#cmd_received');
    this.postService.deleteAllForUserId(payload.userId);
  }
}
