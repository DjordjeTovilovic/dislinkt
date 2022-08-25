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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { catchError, lastValueFrom } from 'rxjs';
import { AuthGuard } from './auth.guard';
import {
  PostServiceClient,
  POST_SERVICE_NAME,
  CreatePostRequest,
  CreateCommentRequest,
} from './protos/post.pb';

@Controller('posts')
export class PostRestController implements OnModuleInit {
  private readonly logger = new Logger(PostRestController.name);

  private postService: PostServiceClient;

  constructor(@Inject(POST_SERVICE_NAME) private postClient: ClientGrpc) {}

  onModuleInit() {
    this.postService =
      this.postClient.getService<PostServiceClient>(POST_SERVICE_NAME);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req, @Body() createPostDto: CreatePostRequest) {
    this.logger.log('create.call#body createPostDto', createPostDto);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const post = await lastValueFrom(
      this.postService.create(createPostDto, metadata).pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      ),
    );

    this.logger.log('create.call#return post', post);
    return post;
  }

  @UseGuards(AuthGuard)
  @Get('/user/:userId')
  async findByUserId(@Req() req, @Param('userId') userId: string) {
    this.logger.log('create.call#param userId', userId);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const posts = await lastValueFrom(
      this.postService.findByUserId({ userId }, metadata).pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      ),
    );

    this.logger.log('findByUsername.call#return posts', posts);
    return posts;
  }

  @UseGuards(AuthGuard)
  @Post('/:postId/comments')
  async comment(
    @Req() req,
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentRequest,
  ) {
    this.logger.log('comment.call#body createCommentDto', createCommentDto);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const createCommentRequest: CreateCommentRequest = {
      postId,
      body: createCommentDto.body,
    };

    const comment = await lastValueFrom(
      this.postService.comment(createCommentRequest, metadata).pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      ),
    );

    this.logger.log('comment.call#return comment', comment);
    return comment;
  }

  @UseGuards(AuthGuard)
  @Post('/:postId/like')
  async like(@Req() req, @Param('postId') postId: string) {
    this.logger.log('like.call#param postId', postId);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const like = await lastValueFrom(
      this.postService.like({ postId }, metadata).pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      ),
    );

    this.logger.log('like.call#return like', like);
    return like;
  }

  @UseGuards(AuthGuard)
  @Post('/:postId/dislike')
  async dislike(@Req() req, @Param('postId') postId: string) {
    this.logger.log('dislike.call#param postId', postId);
    const metadata = new Metadata();
    metadata.add('username', req.user.username);

    const dislike = await lastValueFrom(
      this.postService.dislike({ postId }, metadata).pipe(
        catchError((e) => {
          throw new RpcException(e);
        }),
      ),
    );

    this.logger.log('dislike.call#return dislike', dislike);
    return dislike;
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../uploads',
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
