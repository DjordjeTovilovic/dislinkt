import { Metadata } from '@grpc/grpc-js';
import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { AuthGuard } from './auth.guard';
import {
  EducationUpdateList,
  ExperienceUpdateList,
  InterestUpdateList,
  SkillUpdateList,
  UpdateUserRequest,
  UserServiceClient,
  USER_SERVICE_NAME,
} from './protos/user.pb';

@Controller('users')
export class UserRestController implements OnModuleInit {
  private readonly logger = new Logger(UserRestController.name);

  private userService: UserServiceClient;

  constructor(@Inject(USER_SERVICE_NAME) private userClient: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.userClient.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  @Get('/:id')
  async findById(@Param('id') id) {
    this.logger.log('findById.call#param id', id);

    const user = await lastValueFrom(
      this.userService.findById({ id }).pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      ),
    );

    this.logger.log('findById.call#return', user);
    return user;
  }

  @Get('/username/:username')
  async findByUsername(@Param('username') username) {
    this.logger.log('findByUsername.call#param username', username);

    const user = await lastValueFrom(
      this.userService.findByUsername({ username }).pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      ),
    );

    this.logger.log('findByUsername.call#return', user);
    return user;
  }

  @UseGuards(AuthGuard)
  @Post('/:username/follow')
  async follow(@Req() req, @Param('username') username) {
    this.logger.log('follow.call#param username', username);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const user = await this.userService.follow({ username }, metadata);

    return user;
  }

  @UseGuards(AuthGuard)
  @Post('/:username/unfollow')
  async unfollow(@Req() req, @Param('username') username) {
    this.logger.log('unfollow.call#param username', username);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const user = await this.userService.unfollow({ username }, metadata);

    return user;
  }

  @UseGuards(AuthGuard)
  @Post('/:username/approveFollow')
  async approveFollowRequest(@Req() req, @Param('username') username) {
    this.logger.log('approveFollowRequest.call#param username', username);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const user = await this.userService.approveFollowRequest(
      { username },
      metadata,
    );

    return user;
  }

  @UseGuards(AuthGuard)
  @Post('/:username/declineFollow')
  async declineFollowRequest(@Req() req, @Param('username') username) {
    this.logger.log('declineFollowRequest.call#param username', username);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const user = await this.userService.declineFollowRequest(
      { username },
      metadata,
    );

    return user;
  }

  @UseGuards(AuthGuard)
  @Post('/:username/deleteFollow')
  async deleteFollowRequest(@Req() req, @Param('username') username) {
    this.logger.log('deleteFollowRequest.call#param username', username);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const user = await this.userService.deleteFollowRequest(
      { username },
      metadata,
    );

    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/users/following')
  async allFollowing(@Req() req) {
    this.logger.log('allFollowing#Req token', req.user);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const user = await this.userService.allFollowing(null, metadata);

    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/users/followers')
  async allFollowers(@Req() req) {
    this.logger.log('allFollowers#Req token', req.user);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const user = await this.userService.allFollowers(null, metadata);

    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/users/followingRequests')
  async allFollowingRequests(@Req() req) {
    this.logger.log('allFollowingRequests#Req token', req.user);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const user = await this.userService.allFollowingRequests(null, metadata);

    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/users/followerRequests')
  async allFollowerRequests(@Req() req) {
    this.logger.log('allFollowerRequests#Req token', req.user);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const user = await this.userService.allFollowerRequests(null, metadata);

    return user;
  }

  @UseGuards(AuthGuard)
  @Post('/:username/block')
  async block(@Req() req, @Param('username') username) {
    this.logger.log('block.call#param username', username);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const user = await this.userService.block({ username }, metadata);

    return user;
  }

  @UseGuards(AuthGuard)
  @Post('/:username/unblock')
  async unblock(@Req() req, @Param('username') username) {
    this.logger.log('unblock.call#param username', username);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const user = await this.userService.unblock({ username }, metadata);

    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/users/blocked')
  async allBlockedUsers(@Req() req) {
    this.logger.log('allBlockedUsers#Req token', req.user);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const user = await this.userService.allBlockedUsers(null, metadata);

    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/users/blockedBy')
  async allBlockedByUsers(@Req() req) {
    this.logger.log('allBlockedByUsers#Req token', req.user);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const user = await this.userService.allBlockedByUsers(null, metadata);

    return user;
  }

  @Put('')
  async update(@Body() updateUser: UpdateUserRequest) {
    this.logger.log('update.call#body updateUser', updateUser);

    const user = await lastValueFrom(
      this.userService.update(updateUser).pipe(
        catchError((e) => {
          this.logger.log(e);
          throw new RpcException(e);
        }),
      ),
    );

    this.logger.log('update.call#return', user);
    return user;
  }

  @UseGuards(AuthGuard)
  @Put('/addEducation')
  async addEducations(@Req() req, @Body() body: EducationUpdateList) {
    this.logger.log('addEducations.call#body education[]', body);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    return await this.userService.addEducations(body, metadata);
  }

  @UseGuards(AuthGuard)
  @Put('/removeEducation')
  async removeEducations(@Req() req, @Body() body: EducationUpdateList) {
    this.logger.log('removeEducations.call#body education[]', body);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    return await this.userService.removeEducations(body, metadata);
  }

  @UseGuards(AuthGuard)
  @Put('/addExperience')
  async addExperiences(@Req() req, @Body() body: ExperienceUpdateList) {
    this.logger.log('addExperiences.call#body experience[]', body);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    return await this.userService.addExperiences(body, metadata);
  }

  @UseGuards(AuthGuard)
  @Put('/removeExperience')
  async removeExperiences(@Req() req, @Body() body: ExperienceUpdateList) {
    this.logger.log('removeExperiences.call#body experience[]', body);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    return await this.userService.removeExperiences(body, metadata);
  }

  @UseGuards(AuthGuard)
  @Put('/addSkill')
  async addSkills(@Req() req, @Body() body: SkillUpdateList) {
    this.logger.log('addSkills.call#body skill[]', body);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    return await this.userService.addSkills(body, metadata);
  }

  @UseGuards(AuthGuard)
  @Put('/removeSkill')
  async removeSkills(@Req() req, @Body() body: SkillUpdateList) {
    this.logger.log('removeSkills.call#body skill[]', body);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    return await this.userService.removeSkills(body, metadata);
  }

  @UseGuards(AuthGuard)
  @Put('/addInterest')
  async addInterests(@Req() req, @Body() body: InterestUpdateList) {
    this.logger.log('addInterests.call#body interest[]', body);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    return await this.userService.addInterests(body, metadata);
  }

  @UseGuards(AuthGuard)
  @Put('/removeInterest')
  async removeInterests(@Req() req, @Body() body: InterestUpdateList) {
    this.logger.log('removeInterests.call#body interest[]', body);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    return await this.userService.removeInterests(body, metadata);
  }
}
