import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface UserService {
  findAll(request: any): Observable<any>;
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
}
