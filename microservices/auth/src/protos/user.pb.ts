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

export interface Empty {}

export interface PaginationNumber {
  num: number;
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

  unfollow(request: FollowRequest, metadata?: Metadata): Observable<UserProto>;

  approveFollowRequest(
    request: FollowRequest,
    metadata?: Metadata
  ): Observable<UserProto>;

  declineFollowRequest(
    request: FollowRequest,
    metadata?: Metadata
  ): Observable<UserProto>;

  deleteFollowRequest(
    request: FollowRequest,
    metadata?: Metadata
  ): Observable<UserProto>;

  allFollowingRequests(
    request: Empty,
    metadata?: Metadata
  ): Observable<UsersProto>;

  allFollowerRequests(
    request: Empty,
    metadata?: Metadata
  ): Observable<UsersProto>;

  allFollowing(request: Empty, metadata?: Metadata): Observable<UsersProto>;

  allFollowers(request: Empty, metadata?: Metadata): Observable<UsersProto>;

  block(request: BlockRequest, metadata?: Metadata): Observable<UserProto>;

  unblock(request: BlockRequest, metadata?: Metadata): Observable<UserProto>;

  allBlockedUsers(request: Empty, metadata?: Metadata): Observable<UsersProto>;

  allBlockedByUsers(
    request: Empty,
    metadata?: Metadata
  ): Observable<UsersProto>;

  recommendThroughMutualProfiles(
    request: PaginationNumber,
    metadata?: Metadata
  ): Observable<UsersProto>;

  recommendThroughExperience(
    request: PaginationNumber,
    metadata?: Metadata
  ): Observable<UsersProto>;

  recommendThroughEducation(
    request: PaginationNumber,
    metadata?: Metadata
  ): Observable<UsersProto>;

  recommendThroughSkills(
    request: PaginationNumber,
    metadata?: Metadata
  ): Observable<UsersProto>;

  recommendThroughInterests(
    request: PaginationNumber,
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

  unfollow(
    request: FollowRequest,
    metadata?: Metadata
  ): Promise<UserProto> | Observable<UserProto> | UserProto;

  approveFollowRequest(
    request: FollowRequest,
    metadata?: Metadata
  ): Promise<UserProto> | Observable<UserProto> | UserProto;

  declineFollowRequest(
    request: FollowRequest,
    metadata?: Metadata
  ): Promise<UserProto> | Observable<UserProto> | UserProto;

  deleteFollowRequest(
    request: FollowRequest,
    metadata?: Metadata
  ): Promise<UserProto> | Observable<UserProto> | UserProto;

  allFollowingRequests(
    request: Empty,
    metadata?: Metadata
  ): Promise<UsersProto> | Observable<UsersProto> | UsersProto;

  allFollowerRequests(
    request: Empty,
    metadata?: Metadata
  ): Promise<UsersProto> | Observable<UsersProto> | UsersProto;

  allFollowing(
    request: Empty,
    metadata?: Metadata
  ): Promise<UsersProto> | Observable<UsersProto> | UsersProto;

  allFollowers(
    request: Empty,
    metadata?: Metadata
  ): Promise<UsersProto> | Observable<UsersProto> | UsersProto;

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

  recommendThroughMutualProfiles(
    request: PaginationNumber,
    metadata?: Metadata
  ): Promise<UsersProto> | Observable<UsersProto> | UsersProto;

  recommendThroughExperience(
    request: PaginationNumber,
    metadata?: Metadata
  ): Promise<UsersProto> | Observable<UsersProto> | UsersProto;

  recommendThroughEducation(
    request: PaginationNumber,
    metadata?: Metadata
  ): Promise<UsersProto> | Observable<UsersProto> | UsersProto;

  recommendThroughSkills(
    request: PaginationNumber,
    metadata?: Metadata
  ): Promise<UsersProto> | Observable<UsersProto> | UsersProto;

  recommendThroughInterests(
    request: PaginationNumber,
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
      "unfollow",
      "approveFollowRequest",
      "declineFollowRequest",
      "deleteFollowRequest",
      "allFollowingRequests",
      "allFollowerRequests",
      "allFollowing",
      "allFollowers",
      "block",
      "unblock",
      "allBlockedUsers",
      "allBlockedByUsers",
      "recommendThroughMutualProfiles",
      "recommendThroughExperience",
      "recommendThroughEducation",
      "recommendThroughSkills",
      "recommendThroughInterests",
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
