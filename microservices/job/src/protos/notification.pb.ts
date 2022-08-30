/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Metadata } from "@grpc/grpc-js";
import { Observable } from "rxjs";

export const protobufPackage = "notification";

export interface Empty {}

export interface Notifications {
  notifications: Notification[];
}

export interface Notification {
  id: string;
  postId: string;
  type: string;
  senderUsername: string;
  receiverUsername: string;
  createdAt: string;
}

export const NOTIFICATION_PACKAGE_NAME = "notification";

export interface NotificationServiceClient {
  findAll(request: Empty, metadata?: Metadata): Observable<Notifications>;
}

export interface NotificationServiceController {
  findAll(
    request: Empty,
    metadata?: Metadata
  ): Promise<Notifications> | Observable<Notifications> | Notifications;
}

export function NotificationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findAll"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("NotificationService", method)(
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
      GrpcStreamMethod("NotificationService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const NOTIFICATION_SERVICE_NAME = "NotificationService";
