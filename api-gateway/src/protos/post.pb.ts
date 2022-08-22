/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Metadata } from "@grpc/grpc-js";
import { Observable } from "rxjs";

export const protobufPackage = "post";

export interface FindByUserIdRequest {
  userId: string;
}

export interface PostProtoList {
  posts: PostProto[];
}

export interface CreatePostRequest {
  title: string;
  description: string;
  body: string;
}

export interface CreateCommentRequest {
  postId: string;
  body: string;
}

export interface LikeRequest {
  postId: string;
}

export interface DislikeRequest {
  postId: string;
}

export interface CommentProto {
  body: string;
  postId: string;
  authorUsername: string;
}

export interface PostProto {
  id: string;
  title: string;
  description: string;
  body: string;
  authorUsername: string;
  likeCount: number;
  liked: boolean;
  dislikeCount: number;
  disliked: boolean;
}

export const POST_PACKAGE_NAME = "post";

export interface PostServiceClient {
  create(
    request: CreatePostRequest,
    metadata?: Metadata
  ): Observable<PostProto>;

  findByUserId(
    request: FindByUserIdRequest,
    metadata?: Metadata
  ): Observable<PostProtoList>;

  comment(
    request: CreateCommentRequest,
    metadata?: Metadata
  ): Observable<CommentProto>;

  like(request: LikeRequest, metadata?: Metadata): Observable<PostProto>;

  dislike(request: DislikeRequest, metadata?: Metadata): Observable<PostProto>;
}

export interface PostServiceController {
  create(
    request: CreatePostRequest,
    metadata?: Metadata
  ): Promise<PostProto> | Observable<PostProto> | PostProto;

  findByUserId(
    request: FindByUserIdRequest,
    metadata?: Metadata
  ): Promise<PostProtoList> | Observable<PostProtoList> | PostProtoList;

  comment(
    request: CreateCommentRequest,
    metadata?: Metadata
  ): Promise<CommentProto> | Observable<CommentProto> | CommentProto;

  like(
    request: LikeRequest,
    metadata?: Metadata
  ): Promise<PostProto> | Observable<PostProto> | PostProto;

  dislike(
    request: DislikeRequest,
    metadata?: Metadata
  ): Promise<PostProto> | Observable<PostProto> | PostProto;
}

export function PostServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "create",
      "findByUserId",
      "comment",
      "like",
      "dislike",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("PostService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("PostService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const POST_SERVICE_NAME = "PostService";
