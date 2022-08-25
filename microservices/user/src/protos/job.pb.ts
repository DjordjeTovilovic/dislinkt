/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Metadata } from "@grpc/grpc-js";
import { Observable } from "rxjs";

export const protobufPackage = "job";

export interface Empty {}

export interface LoginResponse {
  token: string;
}

export interface JobsProto {
  jobs: JobProto[];
}

export interface JobProto {
  id: string;
  position: string;
  seniority: string;
  description: string;
  requiredSkills: string[];
  postedBy: string;
}

export const JOB_PACKAGE_NAME = "job";

export interface JobServiceClient {
  findAll(request: Empty, metadata?: Metadata): Observable<JobsProto>;

  addJob(request: JobProto, metadata?: Metadata): Observable<JobProto>;

  recommendedJobOffers(
    request: Empty,
    metadata?: Metadata
  ): Observable<JobsProto>;
}

export interface JobServiceController {
  findAll(
    request: Empty,
    metadata?: Metadata
  ): Promise<JobsProto> | Observable<JobsProto> | JobsProto;

  addJob(
    request: JobProto,
    metadata?: Metadata
  ): Promise<JobProto> | Observable<JobProto> | JobProto;

  recommendedJobOffers(
    request: Empty,
    metadata?: Metadata
  ): Promise<JobsProto> | Observable<JobsProto> | JobsProto;
}

export function JobServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findAll", "addJob", "recommendedJobOffers"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("JobService", method)(
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
      GrpcStreamMethod("JobService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const JOB_SERVICE_NAME = "JobService";
