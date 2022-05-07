import { Controller, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import {
  EmptyRequest,
  FindByUsernameRequest,
  UserServiceController,
  UserServiceControllerMethods,
} from '../protos/user.pb';
import { Metadata } from '@grpc/grpc-js';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
//zbog ove annotacije ispod ne mora se stavljati @GrpcMethod('UserService', 'FindAll') anotacije iznad svake metode
//generise se automatski iz proto fajla
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserController.name);

  // @GrpcMethod('UserService', 'FindAll')
  async findAll(emptyRequest: EmptyRequest, metadata: Metadata) {
    return this.userService.findAll();
  }

  async findByUsername(user: FindByUsernameRequest, metadata: Metadata) {
    return this.userService.findByUsername(user.username);
  }

  async create(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
