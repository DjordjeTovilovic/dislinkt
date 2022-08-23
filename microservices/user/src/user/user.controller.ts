import { Controller, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import {
  EducationUpdateList,
  ExperienceUpdateList,
  FindByIdRequest,
  FindByUsernameRequest,
  FollowRequest,
  InterestUpdateList,
  SkillUpdateList,
  UserServiceController,
  UserServiceControllerMethods,
} from '../protos/user.pb';
import { Metadata } from '@grpc/grpc-js';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Observable } from 'rxjs';

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
