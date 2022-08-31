import { status } from '@grpc/grpc-js';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  EducationUpdateList,
  ExperienceUpdateList,
  InterestUpdateList,
  SkillUpdateList,
} from 'src/protos/user.pb';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { BlockFollowRepository } from './blockFollow.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly blockFollowRepository: BlockFollowRepository,
    @Inject('USER_SERVICE') private userClient: ClientProxy,
  ) {}
  private readonly logger = new Logger(UserService.name);

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.update(updateUserDto);
    return user;
  }

  async findById(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      this.logger.warn('User not found, throwing exception');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with id:${id} not found`,
      });
    }

    return user;
  }

  async findByUsername(username) {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      this.logger.warn('User not found, throwing exception');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with username:${username} not found`,
      });
    }

    return user;
  }

  async deleteByUsername(username) {
    const user = await this.userRepository.deleteByUsername(username);
    if (!user) {
      this.logger.warn('User not found, throwing exception');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with username:${username} not found`,
      });
    }

    this.logger.log('deleteByUsername#emit user_deleted ' + user.id);
    this.userClient.emit('user_deleted', { userId: user.id });
    return user;
  }

  async restoreDeleteById(userId) {
    const user = await this.userRepository.restoreDeleteById(userId);

    if (!user) {
      this.logger.warn('User not found, throwing exception');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with userId:${userId} not found`,
      });
    }

    this.logger.log('deleteByUsername#emit user_restored ' + user.id);
    this.userClient.emit('user_restored', { userId: user.id });
    return user;
  }

  async follow(usernameToFollow, username) {
    const user = await this.blockFollowRepository.follow(
      usernameToFollow,
      username,
    );

    if (!user) {
      this.logger.warn('User not found, throwing exception');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with username:${usernameToFollow} not found`,
      });
    }

    return user;
  }

  async unfollow(usernameToUnfollow, username) {
    const user = await this.blockFollowRepository.unfollow(
      usernameToUnfollow,
      username,
    );

    if (!user) {
      this.logger.warn('User not found, throwing exception');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with username:${usernameToUnfollow} not found`,
      });
    }

    return user;
  }

  async approveFollowRequest(usernameToUnfollow, username) {
    const user = await this.blockFollowRepository.approveFollowRequest(
      usernameToUnfollow,
      username,
    );

    if (!user) {
      this.logger.warn('User not found, throwing exception');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with username:${usernameToUnfollow} not found`,
      });
    }

    return user;
  }

  async declineFollowRequest(usernameToUnfollow, username) {
    const user = await this.blockFollowRepository.declineFollowRequest(
      usernameToUnfollow,
      username,
    );

    if (!user) {
      this.logger.warn('User not found, throwing exception');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with username:${usernameToUnfollow} not found`,
      });
    }

    return user;
  }

  async deleteFollowRequest(usernameToUnfollow, username) {
    const user = await this.blockFollowRepository.deleteFollowRequest(
      usernameToUnfollow,
      username,
    );

    if (!user) {
      this.logger.warn('User not found, throwing exception');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with username:${usernameToUnfollow} not found`,
      });
    }

    return user;
  }

  async allFollowing(username) {
    const users = await this.blockFollowRepository.allFollowing(username);

    if (!users) {
      this.logger.warn('No users following');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with username:${username} has no following users`,
      });
    }

    return users;
  }

  async allFollowers(username) {
    const users = await this.blockFollowRepository.allFollowers(username);
    if (!users) {
      this.logger.warn('No users followers');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with username:${username} has no followers users`,
      });
    }

    return users;
  }

  async allFollowingRequests(username) {
    const users = await this.blockFollowRepository.allFollowingRequests(
      username,
    );

    if (!users) {
      this.logger.warn('No users followingRequests');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with username:${username} has no followingRequests users`,
      });
    }

    return users;
  }

  async allFollowerRequests(username) {
    const users = await this.blockFollowRepository.allFollowerRequests(
      username,
    );

    if (!users) {
      this.logger.warn('No users followerRequests');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with username:${username} has no followerRequests users`,
      });
    }

    return users;
  }

  async recommendThroughMutualProfiles(pageNumber, username) {
    const skipNumber = (pageNumber - 1) * 10;
    return await this.userRepository.recommendThroughMutualProfiles(
      skipNumber,
      username,
    );
  }

  async recommendThroughEducation(pageNumber, username) {
    const skipNumber = (pageNumber - 1) * 10;
    return await this.userRepository.recommendThroughEducation(
      skipNumber,
      username,
    );
  }

  async recommendThroughExperience(pageNumber, username) {
    const skipNumber = (pageNumber - 1) * 10;
    return await this.userRepository.recommendThroughExperience(
      skipNumber,
      username,
    );
  }

  async recommendThroughInterests(pageNumber, username) {
    const skipNumber = (pageNumber - 1) * 10;
    return await this.userRepository.recommendThroughInterests(
      skipNumber,
      username,
    );
  }

  async recommendThroughSkills(pageNumber, username) {
    const skipNumber = (pageNumber - 1) * 10;
    return await this.userRepository.recommendThroughSkills(
      skipNumber,
      username,
    );
  }

  async block(usernameToBlock, username) {
    const user = await this.blockFollowRepository.block(
      usernameToBlock,
      username,
    );

    if (!user) {
      this.logger.warn('User not found, throwing exception');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with username:${usernameToBlock} not found`,
      });
    }

    return user;
  }

  async unblock(usernameToBlock, username) {
    const user = await this.blockFollowRepository.unblock(
      usernameToBlock,
      username,
    );

    if (!user) {
      this.logger.warn('User not found, throwing exception');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with username:${usernameToBlock} not found`,
      });
    }

    return user;
  }

  async allBlockedUsers(username) {
    const users = await this.blockFollowRepository.allBlockedUsers(username);

    if (!users) {
      this.logger.warn('No users blocked');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with username:${username} has no blocked users`,
      });
    }

    return users;
  }

  async allBlockedByUsers(username) {
    const users = await this.blockFollowRepository.allBlockedByUsers(username);
    return users;
  }

  async addEducations(request: EducationUpdateList, username) {
    const user = {
      username: username,
      education: request.educations,
    };

    const edus = {
      educations: (await this.userRepository.addEducations(user)).toJson(),
    };

    return edus;
  }

  async removeEducations(request: EducationUpdateList, username) {
    const user = {
      username: username,
      education: request.educations,
    };
    const edus = {
      educations: (await this.userRepository.removeEducations(user)).toJson(),
    };
    return edus;
  }

  async addExperiences(request: ExperienceUpdateList, username) {
    const user = {
      username: username,
      experience: request.experiences,
    };

    const exps = {
      experiences: (await this.userRepository.addExperiences(user)).toJson(),
    };

    return exps;
  }

  async removeExperiences(request: ExperienceUpdateList, username) {
    const user = {
      username: username,
      experience: request.experiences,
    };
    const exps = {
      experiences: (await this.userRepository.removeExperiences(user)).toJson(),
    };
    return exps;
  }

  async addSkills(request: SkillUpdateList, username) {
    const user = {
      username: username,
      skills: request.skills,
    };

    const skills = {
      skills: (await this.userRepository.addSkills(user)).toJson(),
    };

    return skills;
  }

  async removeSkills(request: SkillUpdateList, username) {
    const user = {
      username: username,
      skills: request.skills,
    };
    const skills = {
      skills: (await this.userRepository.removeSkills(user)).toJson(),
    };
    return skills;
  }

  async addInterests(request: InterestUpdateList, username) {
    const user = {
      username: username,
      interests: request.interests,
    };

    const ints = {
      interests: (await this.userRepository.addInterests(user)).toJson(),
    };

    return ints;
  }

  async removeInterests(request: InterestUpdateList, username) {
    const user = {
      username: username,
      interests: request.interests,
    };
    const ints = {
      interests: (await this.userRepository.removeInterests(user)).toJson(),
    };
    return ints;
  }
  async getSkillsForUser(userId: string) {
    return this.userRepository.getSkillsForUser(userId);
  }
  async getEducationsForUser(userId: string) {
    return this.userRepository.getEducationsForUser(userId);
  }
  async getInterestsForUser(userId: string) {
    return this.userRepository.getInterestsForUser(userId);
  }
  async getExperiencesForUser(userId: string) {
    return this.userRepository.getExperiencesForUser(userId);
  }
}
