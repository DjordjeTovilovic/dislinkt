import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Headers } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('/profile/me')
  getMe(@Headers('Authorization') token: string) {
    if (token !== 'Bearer null') {
      const validToken = token.split(' ')[1];
      const { valid, user } = this.authService.validateToken(validToken);
      if (valid) return this.userService.findOne(user.id);
      else return null;
    } else return null;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Patch('/profile/me/:dislinktToken')
  connectToDislinktAccount(
    @Param('dislinktToken') dislinktToken: string,
    @Headers('Authorization') token: string,
  ) {
    console.log(token);
    if (token !== 'Bearer null') {
      const validToken = token.split(' ')[1];
      const { valid, user } = this.authService.validateToken(validToken);
      if (valid)
        return this.userService.connectToDislinktAccount(
          user.id,
          dislinktToken,
        );
      else return null;
    } else return null;
  }
}
