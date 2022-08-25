import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller()
export class DeleteUserSaga {
  constructor(
    @Inject('POST_SERVICE') private postClient: ClientProxy,
    @Inject('USER_SERVICE') private userClient: ClientProxy,
  ) {}
  private readonly logger = new Logger(DeleteUserSaga.name);

  @EventPattern('user_deleted')
  async handleUserDeleted(payload) {
    this.logger.log('SAGA#handle_user_deleted#event');
    return this.deleteUserPosts(payload);
  }

  async deleteUserPosts(payload) {
    this.logger.log('SAGA#delete_user_posts#send');
    return this.postClient.send({ cmd: 'delete_user_posts' }, payload);
  }

  @EventPattern('user_posts_deleted')
  async handleUserPostsDeleted(payload) {
    this.logger.log(
      'SAGA#completed_succesfully#deleted user ' + payload.userId,
    );
  }

  // Saga compensations

  @EventPattern('user_posts_delete_failed')
  async handleUserPostsDeleteFailed(payload) {
    this.logger.log('SAGA#user_posts_delete_failed#event');
    return this.restoreDeletedUser(payload);
  }

  async restoreDeletedUser(payload) {
    this.logger.log('SAGA#restoreDeletedUser#send');
    return this.userClient.send({ cmd: 'restore_deleted_user' }, payload);
  }

  @EventPattern('user_restored')
  async handleUserRestored(payload) {
    this.logger.log('SAGA#user_restored#event');
    this.logger.log(
      'SAGA#compensated#returned to original state#user not deleted ' +
        payload.userId,
    );
  }
}
