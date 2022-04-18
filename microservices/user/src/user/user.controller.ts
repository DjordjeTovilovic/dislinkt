import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @MessagePattern('createUser')
  // create(@Payload() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @GrpcMethod('UserService', 'FindAll')
  findAll() {
    return this.userService.findAll();
  }

  @GrpcMethod('UserService', 'FindByUsername')
  async findByUsername(user) {
    return await this.userService.findByUsername(user.username);
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
