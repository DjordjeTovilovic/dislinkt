/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Metadata } from "@grpc/grpc-js";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export enum Gender {
  MALE = 0,
  FEMALE = 1,
  UNRECOGNIZED = -1,
}

export interface FindByIdRequest {
  id: string;
}

export interface FindByUsernameRequest {
  username: string;
}

export interface FollowRequest {
  username: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
  bio: string;
  image: string;
  phoneNumber: string;
  birthday: string;
  gender: Gender;
  experiences: ExperienceProto[];
  education: EducationProto[];
  skills: SkillProto[];
  interests: InterestProto[];
  privateProfile: boolean;
}

export interface UserProto {
  id: string;
  email: string;
  username: string;
  bio: string;
  image: string;
  password: string;
  phoneNumber: string;
  birthday: string;
  gender: Gender;
  experiences: ExperienceProto[];
  education: EducationProto[];
  skills: SkillProto[];
  interests: InterestProto[];
  privateProfile: boolean;
}

export interface UpdateUserRequest {
  id: string;
  email: string;
  username: string;
  bio: string;
  image: string;
  password: string;
  phoneNumber: string;
  birthday: string;
  gender: Gender;
  experiences: ExperienceProto[];
  education: EducationProto[];
  skills: SkillProto[];
  interests: InterestProto[];
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

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  findById(
    request: FindByIdRequest,
    metadata?: Metadata
  ): Observable<UserProto>;

  findByUsername(
    request: FindByUsernameRequest,
    metadata?: Metadata
  ): Observable<UserProto>;

  create(
    request: CreateUserRequest,
    metadata?: Metadata
  ): Observable<UserProto>;

  follow(request: FollowRequest, metadata?: Metadata): Observable<UserProto>;

  update(
    request: UpdateUserRequest,
    metadata?: Metadata
  ): Observable<UserProto>;
}

export interface UserServiceController {
  findById(
    request: FindByIdRequest,
    metadata?: Metadata
  ): Promise<UserProto> | Observable<UserProto> | UserProto;

  findByUsername(
    request: FindByUsernameRequest,
    metadata?: Metadata
  ): Promise<UserProto> | Observable<UserProto> | UserProto;

  create(
    request: CreateUserRequest,
    metadata?: Metadata
  ): Promise<UserProto> | Observable<UserProto> | UserProto;

  follow(
    request: FollowRequest,
    metadata?: Metadata
  ): Promise<UserProto> | Observable<UserProto> | UserProto;

  update(
    request: UpdateUserRequest,
    metadata?: Metadata
  ): Promise<UserProto> | Observable<UserProto> | UserProto;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "findById",
      "findByUsername",
      "create",
      "follow",
      "update",
    ];
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
