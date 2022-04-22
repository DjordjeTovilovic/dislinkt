/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod, RpcException } from "@nestjs/microservices";
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface EmptyReq {}

export interface Users {
  users: string;
}

export interface FindByUsernameReq {
  username: string;
}

export interface UserDto {
  id: string;
  email: string;
  username: string;
  bio: string;
  image: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  findAll(request: EmptyReq): Observable<Users>;

  findByUsername(request: FindByUsernameReq): Observable<UserDto>;
}

export interface UserServiceController {
  findAll(request: EmptyReq): Promise<Users> | Observable<Users> | Users;

  findByUsername(
    request: FindByUsernameReq
  ): Promise<UserDto> | Observable<UserDto> | UserDto;
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
