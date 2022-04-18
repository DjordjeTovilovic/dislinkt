import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface UserService {
  findAll(request: any): Observable<any>;
  findByUsername(request: any): any;
}

@Controller()
export class AppController implements OnModuleInit {
  private userService: UserService;

  constructor(@Inject('USER_SERVICE') private userClient: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.userClient.getService<UserService>('UserService');
  }

  @Get()
  findAll() {
    return this.userService.findAll({});
  }

  @Get('/:username')
  async getByUsername(@Param('username') username) {
    const user = await this.userService
      .findByUsername({ username })
      .toPromise();

    return user;
  }
}
