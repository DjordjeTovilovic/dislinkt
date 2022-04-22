import {
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Param,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { UserServiceClient } from './protos/user.pb';

@Controller()
export class AppController implements OnModuleInit {
  private readonly logger = new Logger(AppController.name);

  private userService: UserServiceClient;

  constructor(@Inject('USER_SERVICE') private userClient: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.userClient.getService<UserServiceClient>('UserService');
  }

  @Get()
  findAll() {
    this.logger.log('findAll.call');
    return this.userService.findAll({});
  }

  @Get('/:username')
  async getByUsername(@Param('username') username) {
    this.logger.log(`getByUsername.call#param username ${username}`);
    const user = this.userService.findByUsername({ username }).pipe(
      catchError((e) => {
        throw new RpcException(e);
      }),
    );
    this.logger.log('getByUsername.call#return', await lastValueFrom(user));
    return user;
  }
}
