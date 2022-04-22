import { Controller, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  FindByUsernameReq,
  Users,
  UserServiceController,
  UserServiceControllerMethods,
} from '../protos/user.pb';
import { Observable } from 'rxjs';

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
  findAll(): Users {
    return this.userService.findAll();
  }

  // @GrpcMethod('UserService', 'FindByUsername')
  async findByUsername(user: FindByUsernameReq) {
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
