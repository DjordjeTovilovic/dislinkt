/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Metadata } from "@grpc/grpc-js";
import { Observable } from "rxjs";

export const protobufPackage = "messaging";

export interface Empty {}

export interface FindAllRequest {
  user1Id: string;
  user2Id: string;
}

export interface Messages {
  messages: Message[];
}

export interface Message {
  message: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
}

export const MESSAGING_PACKAGE_NAME = "messaging";

export interface MessagingServiceClient {
  findAll(request: FindAllRequest, metadata?: Metadata): Observable<Messages>;
}

export interface MessagingServiceController {
  findAll(
    request: FindAllRequest,
    metadata?: Metadata
  ): Promise<Messages> | Observable<Messages> | Messages;
}

export function MessagingServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findAll"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("MessagingService", method)(
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
      GrpcStreamMethod("MessagingService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const MESSAGING_SERVICE_NAME = "MessagingService";
