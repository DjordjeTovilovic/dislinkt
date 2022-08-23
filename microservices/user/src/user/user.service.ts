import { status } from '@grpc/grpc-js';
import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  EducationUpdateList,
  ExperienceUpdateList,
  InterestUpdateList,
  SkillUpdateList,
} from 'src/protos/user.pb';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
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

  async follow(usernameToFollow, username) {
    const user = await this.userRepository.follow(usernameToFollow, username);

    if (!user) {
      this.logger.warn('User not found, throwing exception');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with username:${usernameToFollow} not found`,
      });
    }

    return user;
  }

  async block(usernameToBlock, username) {
    const user = await this.userRepository.block(usernameToBlock, username);

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
    const user = await this.userRepository.unblock(usernameToBlock, username);

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
    const users = await this.userRepository.allBlockedUsers(username);

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
    const users = await this.userRepository.allBlockedByUsers(username);
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
}
