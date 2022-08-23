/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { Metadata } from "@grpc/grpc-js";

export const protobufPackage = "auth";

export enum Gender {
  MALE = 0,
  FEMALE = 1,
  UNRECOGNIZED = -1,
}

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
  user: AuthUserProto | undefined;
}

export interface AuthUserProto {
  id: string;
  email: string;
  username: string;
  bio: string;
  image: string;
  password: string;
  phoneNumber: string;
  birthday: string;
  gender: Gender;
  privateProfile: boolean;
}

export interface RegistrationRequest {
  username: string;
  password: string;
  email: string;
  bio: string;
  image: string;
  phoneNumber: string;
  birthday: string;
  gender: Gender;
  privateProfile: boolean;
}

export interface ExperienceProto {
  id: string;
  position: string;
  company: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface EducationProto {
  id: string;
  institution: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface SkillProto {
  id: string;
  name: string;
}

export interface InterestProto {
  id: string;
  name: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse>;

  registration(
    request: RegistrationRequest,
    metadata?: Metadata
  ): Observable<AuthUserProto>;

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

  registration(
    request: RegistrationRequest,
    metadata?: Metadata
  ): Promise<AuthUserProto> | Observable<AuthUserProto> | AuthUserProto;

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
    const grpcMethods: string[] = ["login", "registration", "loggedIn"];
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
