/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { Metadata } from "@grpc/grpc-js";

export const protobufPackage = "user";

export enum Gender {
  MALE = 0,
  FEMALE = 1,
  UNRECOGNIZED = -1,
}

export interface Empty {}

export interface FindByIdRequest {
  id: string;
}

export interface FindByUsernameRequest {
  username: string;
}

export interface FollowRequest {
  username: string;
}

export interface BlockRequest {
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
  privateProfile: boolean;
}

export interface UsersProto {
  users: UserProto[];
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

export interface WorkedProto {
  id: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface ExperienceUpdateList {
  experiences: ExperienceProto[];
}

export interface EducationProto {
  id: string;
  institution: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface AttendedProto {
  id: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface EducationUpdateList {
  educations: EducationProto[];
}

export interface SkillProto {
  id: string;
  name: string;
}

export interface SkillUpdateList {
  skills: SkillProto[];
}

export interface InterestProto {
  id: string;
  name: string;
}

export interface InterestUpdateList {
  interests: InterestProto[];
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

  block(request: BlockRequest, metadata?: Metadata): Observable<UserProto>;

  unblock(request: BlockRequest, metadata?: Metadata): Observable<UserProto>;

  allBlockedUsers(request: Empty, metadata?: Metadata): Observable<UsersProto>;

  allBlockedByUsers(
    request: Empty,
    metadata?: Metadata
  ): Observable<UsersProto>;

  update(
    request: UpdateUserRequest,
    metadata?: Metadata
  ): Observable<UserProto>;

  addEducations(
    request: EducationUpdateList,
    metadata?: Metadata
  ): Observable<EducationUpdateList>;

  removeEducations(
    request: EducationUpdateList,
    metadata?: Metadata
  ): Observable<EducationUpdateList>;

  addExperiences(
    request: ExperienceUpdateList,
    metadata?: Metadata
  ): Observable<ExperienceUpdateList>;

  removeExperiences(
    request: ExperienceUpdateList,
    metadata?: Metadata
  ): Observable<ExperienceUpdateList>;

  addSkills(
    request: SkillUpdateList,
    metadata?: Metadata
  ): Observable<SkillUpdateList>;

  removeSkills(
    request: SkillUpdateList,
    metadata?: Metadata
  ): Observable<SkillUpdateList>;

  addInterests(
    request: InterestUpdateList,
    metadata?: Metadata
  ): Observable<InterestUpdateList>;

  removeInterests(
    request: InterestUpdateList,
    metadata?: Metadata
  ): Observable<InterestUpdateList>;
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

  block(
    request: BlockRequest,
    metadata?: Metadata
  ): Promise<UserProto> | Observable<UserProto> | UserProto;

  unblock(
    request: BlockRequest,
    metadata?: Metadata
  ): Promise<UserProto> | Observable<UserProto> | UserProto;

  allBlockedUsers(
    request: Empty,
    metadata?: Metadata
  ): Promise<UsersProto> | Observable<UsersProto> | UsersProto;

  allBlockedByUsers(
    request: Empty,
    metadata?: Metadata
  ): Promise<UsersProto> | Observable<UsersProto> | UsersProto;

  update(
    request: UpdateUserRequest,
    metadata?: Metadata
  ): Promise<UserProto> | Observable<UserProto> | UserProto;

  addEducations(
    request: EducationUpdateList,
    metadata?: Metadata
  ):
    | Promise<EducationUpdateList>
    | Observable<EducationUpdateList>
    | EducationUpdateList;

  removeEducations(
    request: EducationUpdateList,
    metadata?: Metadata
  ):
    | Promise<EducationUpdateList>
    | Observable<EducationUpdateList>
    | EducationUpdateList;

  addExperiences(
    request: ExperienceUpdateList,
    metadata?: Metadata
  ):
    | Promise<ExperienceUpdateList>
    | Observable<ExperienceUpdateList>
    | ExperienceUpdateList;

  removeExperiences(
    request: ExperienceUpdateList,
    metadata?: Metadata
  ):
    | Promise<ExperienceUpdateList>
    | Observable<ExperienceUpdateList>
    | ExperienceUpdateList;

  addSkills(
    request: SkillUpdateList,
    metadata?: Metadata
  ): Promise<SkillUpdateList> | Observable<SkillUpdateList> | SkillUpdateList;

  removeSkills(
    request: SkillUpdateList,
    metadata?: Metadata
  ): Promise<SkillUpdateList> | Observable<SkillUpdateList> | SkillUpdateList;

  addInterests(
    request: InterestUpdateList,
    metadata?: Metadata
  ):
    | Promise<InterestUpdateList>
    | Observable<InterestUpdateList>
    | InterestUpdateList;

  removeInterests(
    request: InterestUpdateList,
    metadata?: Metadata
  ):
    | Promise<InterestUpdateList>
    | Observable<InterestUpdateList>
    | InterestUpdateList;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "findById",
      "findByUsername",
      "create",
      "follow",
      "block",
      "unblock",
      "allBlockedUsers",
      "allBlockedByUsers",
      "update",
      "addEducations",
      "removeEducations",
      "addExperiences",
      "removeExperiences",
      "addSkills",
      "removeSkills",
      "addInterests",
      "removeInterests",
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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
