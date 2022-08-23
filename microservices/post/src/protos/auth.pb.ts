/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Metadata } from "@grpc/grpc-js";
import { Observable } from "rxjs";

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

export interface GenerateApiTokenRequest {
  id: string;
}

export interface GenerateApiTokenResponse {
  apiToken: string;
}

export interface ValidateApiTokenRequest {
  apiToken: string;
}

export interface ValidateApiTokenResponse {
  valid: boolean;
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

  generateApiToken(
    request: GenerateApiTokenRequest,
    metadata?: Metadata
  ): Observable<GenerateApiTokenResponse>;

  validateApiToken(
    request: ValidateApiTokenRequest,
    metadata?: Metadata
  ): Observable<ValidateApiTokenResponse>;
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

  generateApiToken(
    request: GenerateApiTokenRequest,
    metadata?: Metadata
  ):
    | Promise<GenerateApiTokenResponse>
    | Observable<GenerateApiTokenResponse>
    | GenerateApiTokenResponse;

  validateApiToken(
    request: ValidateApiTokenRequest,
    metadata?: Metadata
  ):
    | Promise<ValidateApiTokenResponse>
    | Observable<ValidateApiTokenResponse>
    | ValidateApiTokenResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "login",
      "registration",
      "loggedIn",
      "generateApiToken",
      "validateApiToken",
    ];
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
