/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { Metadata } from "@grpc/grpc-js";

export const protobufPackage = "auth";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface LoggedInRequest {
  token: string;
}

export interface LoggedInResponse {
  valid: boolean;
  user: UserProto | undefined;
}

export interface UserProto {
  id: string;
  email: string;
  username: string;
  bio: string;
  image: string;
  password: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse>;

  loggedIn(
    request: LoggedInRequest,
    metadata?: Metadata
  ): Observable<LoggedInResponse>;
}

export interface AuthServiceController {
  login(
    request: LoginRequest,
    metadata?: Metadata
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  loggedIn(
    request: LoggedInRequest,
    metadata?: Metadata
  ):
    | Promise<LoggedInResponse>
    | Observable<LoggedInResponse>
    | LoggedInResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["login", "loggedIn"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("AuthService", method)(
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
      GrpcStreamMethod("AuthService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
