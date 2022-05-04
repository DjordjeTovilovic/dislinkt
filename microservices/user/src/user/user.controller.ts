import { Controller, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import {
  EmptyRequest,
  FindByUsernameRequest,
  UserServiceController,
  UserServiceControllerMethods,
} from '../protos/user.pb';
import { Metadata } from '@grpc/grpc-js';

@Controller()
//zbog ove annotacije ispod ne mora se stavljati @GrpcMethod('UserService', 'FindAll') anotacije iznad svake metode
//generise se automatski iz proto fajla
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserController.name);

  // @MessagePattern('createUser')
  // create(@Payload() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @GrpcMethod('UserService', 'FindAll')
  async findAll(emptyRequest: EmptyRequest, metadata: Metadata) {
    this.logger.log('findAll.call');
    // console.log(metadata.get('username')[0]);
    return this.userService.findAll();
  }

  // @GrpcMethod('UserService', 'FindByUsername')
  async findByUsername(user: FindByUsernameRequest, metadata: Metadata) {
    this.logger.log('findByUsername.call#param user', user);
    return this.userService.findByUsername(user.username);
  }

  // @MessagePattern('updateUser')
  // update(@Payload() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(updateUserDto.id, updateUserDto);
  // }

  // @MessagePattern('removeUser')
  // remove(@Payload() id: number) {
  //   return this.userService.remove(id);
  // }
}
