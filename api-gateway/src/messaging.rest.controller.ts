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

  constructor(@Inject(MESSAGING_SERVICE_NAME) private postClient: ClientGrpc) {}

  onModuleInit() {
    this.messagingService = this.postClient.getService<MessagingServiceClient>(
      MESSAGING_SERVICE_NAME,
    );
  }

  @Post('send')
  async sendMessage(@Body() newMessage: NewMessage) {
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

  @Post()
  async findAll(@Body() usersDto: FindAllRequest) {
    this.logger.log('findAll.call#body ', usersDto);

    const messages = await lastValueFrom(
      this.messagingService.findAll(usersDto).pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      ),
    );

    this.logger.log('findAll.call#return messages', messages);
    return messages;
  }
}
