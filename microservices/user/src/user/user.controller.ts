import { Metadata } from '@grpc/grpc-js';
import { Controller, Logger } from '@nestjs/common';
import {
  BlockRequest,
  EducationUpdateList,
  Empty,
  ExperienceUpdateList,
  FindByIdRequest,
  FindByUsernameRequest,
  FollowRequest,
  InterestUpdateList,
  SkillUpdateList,
  UserServiceController,
  UserServiceControllerMethods,
} from '../protos/user.pb';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller()
//zbog ove annotacije ispod ne mora se stavljati @GrpcMethod('UserService', 'FindById') anotacije iznad svake metode
//generise se automatski iz proto fajla
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserController.name);

  // @GrpcMethod('UserService', 'FindById')
  async findById(user: FindByIdRequest, metadata: Metadata) {
    return this.userService.findById(user.id);
  }

  async findByUsername(user: FindByUsernameRequest, metadata: Metadata) {
    return this.userService.findByUsername(user.username);
  }

  async create(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async update(updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  async follow(userToFollow: FollowRequest, metadata: Metadata) {
    const username = metadata.get('username')[0];
    return this.userService.follow(userToFollow.username, username);
  }

  async block(userToFollow: BlockRequest, metadata: Metadata) {
    const username = metadata.get('username')[0];
    return this.userService.block(userToFollow.username, username);
  }

  async unblock(userToFollow: BlockRequest, metadata: Metadata) {
    const username = metadata.get('username')[0];
    return this.userService.unblock(userToFollow.username, username);
  }

  async allBlockedUsers(reques: Empty, metadata: Metadata) {
    const username = metadata.get('username')[0];
    return await this.userService.allBlockedUsers(username);
  }

  async allBlockedByUsers(reques: Empty, metadata: Metadata) {
    const username = metadata.get('username')[0];
    return await this.userService.allBlockedByUsers(username);
  }

  async addEducations(request: EducationUpdateList, metadata?: Metadata) {
    const username = metadata.get('username')[0];
    return await this.userService.addEducations(request, username);
  }

  async removeEducations(request: EducationUpdateList, metadata?: Metadata) {
    const username = metadata.get('username')[0];
    return await this.userService.removeEducations(request, username);
  }

  async addExperiences(request: ExperienceUpdateList, metadata?: Metadata) {
    const username = metadata.get('username')[0];
    return await this.userService.addExperiences(request, username);
  }

  async removeExperiences(request: ExperienceUpdateList, metadata?: Metadata) {
    const username = metadata.get('username')[0];
    return await this.userService.removeExperiences(request, username);
  }

  async addSkills(request: SkillUpdateList, metadata?: Metadata) {
    const username = metadata.get('username')[0];
    return await this.userService.addSkills(request, username);
  }

  async removeSkills(request: SkillUpdateList, metadata?: Metadata) {
    const username = metadata.get('username')[0];
    return await this.userService.removeSkills(request, username);
  }

  async addInterests(request: InterestUpdateList, metadata?: Metadata) {
    const username = metadata.get('username')[0];
    return await this.userService.addInterests(request, username);
  }

  async removeInterests(request: InterestUpdateList, metadata?: Metadata) {
    const username = metadata.get('username')[0];
    return await this.userService.removeInterests(request, username);
  }
}
