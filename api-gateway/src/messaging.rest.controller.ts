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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { AuthGuard } from './auth.guard';
import {
  FindAllRequest,
  MessagingServiceClient,
  MESSAGING_SERVICE_NAME,
  NewMessage,
} from './protos/messaging.pb';

@Controller('messages')
export class MessagingRestController implements OnModuleInit {
  private readonly logger = new Logger(MessagingRestController.name);

  private messagingService: MessagingServiceClient;

  constructor(
    @Inject(MESSAGING_SERVICE_NAME) private messagingClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.messagingService =
      this.messagingClient.getService<MessagingServiceClient>(
        MESSAGING_SERVICE_NAME,
      );
  }

  @UseGuards(AuthGuard)
  @Post('send')
  async sendMessage(@Req() req, @Body() newMessage: NewMessage) {
    newMessage.senderId = req.user.id;
    this.logger.log('sendMessage.call#body ', newMessage);

    const messages = await lastValueFrom(
      this.messagingService.sendMessage(newMessage).pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      ),
    );

    // this.logger.log('sendMessage.call#return messages', messages);
    // return messages;
  }

  @UseGuards(AuthGuard)
  @Post(':userId')
  async findAll(@Req() req, @Param('userId') userId: string) {
    const usersDto: FindAllRequest = {
      user1Id: req.user.id,
      user2Id: userId,
    };
    this.logger.log('findAll.call#body ', usersDto);
    const messages = await lastValueFrom(
      this.messagingService.findAll(usersDto).pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      ),
    );

    this.logger.log('findAll.call#return messages');
    return messages;
  }
}
