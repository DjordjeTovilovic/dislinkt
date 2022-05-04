import { Metadata } from '@grpc/grpc-js';
import {
  Controller,
  Get,
  Inject,
  Logger,
  OnModuleInit,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { UserServiceClient, USER_SERVICE_NAME } from './protos/user.pb';

@Controller('user')
export class UserRestController implements OnModuleInit {
  private readonly logger = new Logger(UserRestController.name);

  private userService: UserServiceClient;

  constructor(@Inject(USER_SERVICE_NAME) private userClient: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.userClient.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req) {
    this.logger.log('findAll.call');
    // Ove dvije linije ispod dodaju username u metapodatke koji se mogu slati microservisima
    // Objekat req.user postoji samo ako se koristi AuthGuard za autentifikaciju, jer inace user nije ulogovan
    // U microservisu se pristupa kao metadata.get('username')[0]
    // Ubacite slobodno jos metapodataka u zahtjev kad god vam treba
    const metadata = new Metadata();
    metadata.add('user', req.user.username);

    return await lastValueFrom(this.userService.findAll({}, metadata));
  }

  @Get('/:username')
  async getByUsername(@Param('username') username) {
    this.logger.log(`getByUsername.call#param username ${username}`);

    const user = await lastValueFrom(
      this.userService.findByUsername({ username }).pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      ),
    );
    this.logger.log('getByUsername.call#return', user);
    return user;
  }
}
