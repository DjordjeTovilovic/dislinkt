/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { Metadata } from "@grpc/grpc-js";

export const protobufPackage = "user";

export interface EmptyRequest {}

export interface Users {
  users: string;
}

export interface FindByUsernameRequest {
  username: string;
}

export interface UserProto {
  id?: string | undefined;
  email?: string | undefined;
  username?: string | undefined;
  bio?: string | undefined;
  image?: string | undefined;
  password?: string | undefined;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  findAll(request: EmptyRequest, metadata?: Metadata): Observable<Users>;

  findByUsername(
    request: FindByUsernameRequest,
    metadata?: Metadata
  ): Observable<UserProto>;
}

export interface UserServiceController {
  findAll(
    request: EmptyRequest,
    metadata?: Metadata
  ): Promise<Users> | Observable<Users> | Users;

  findByUsername(
    request: FindByUsernameRequest,
    metadata?: Metadata
  ): Promise<UserProto> | Observable<UserProto> | UserProto;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findAll", "findByUsername"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("UserService", method)(
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
      GrpcStreamMethod("UserService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const USER_SERVICE_NAME = "UserService";

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
