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

  async unfollow(userToUnfollow: FollowRequest, metadata: Metadata) {
    const username = metadata.get('username')[0];
    return this.userService.unfollow(userToUnfollow.username, username);
  }

  async approveFollowRequest(
    userToUnfollow: FollowRequest,
    metadata: Metadata,
  ) {
    const username = metadata.get('username')[0];
    return this.userService.approveFollowRequest(
      userToUnfollow.username,
      username,
    );
  }

  async declineFollowRequest(
    userToUnfollow: FollowRequest,
    metadata: Metadata,
  ) {
    const username = metadata.get('username')[0];
    return this.userService.declineFollowRequest(
      userToUnfollow.username,
      username,
    );
  }

  async deleteFollowRequest(userToUnfollow: FollowRequest, metadata: Metadata) {
    const username = metadata.get('username')[0];
    return this.userService.deleteFollowRequest(
      userToUnfollow.username,
      username,
    );
  }

  async allFollowing(reques: Empty, metadata: Metadata) {
    const username = metadata.get('username')[0];
    return await this.userService.allFollowing(username);
  }

  async allFollowers(reques: Empty, metadata: Metadata) {
    const username = metadata.get('username')[0];
    return await this.userService.allFollowers(username);
  }

  async allFollowingRequests(reques: Empty, metadata: Metadata) {
    const username = metadata.get('username')[0];
    return await this.userService.allFollowingRequests(username);
  }

  async allFollowerRequests(reques: Empty, metadata: Metadata) {
    const username = metadata.get('username')[0];
    return await this.userService.allFollowerRequests(username);
  }

  async block(userToBlock: BlockRequest, metadata: Metadata) {
    const username = metadata.get('username')[0];
    return this.userService.block(userToBlock.username, username);
  }

  async unblock(userToUnblock: BlockRequest, metadata: Metadata) {
    const username = metadata.get('username')[0];
    return this.userService.unblock(userToUnblock.username, username);
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
