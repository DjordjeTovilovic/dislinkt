#!/bin/bash

protoc --plugin=node_modules/.bin/protoc-gen-ts_proto -I=./protos --ts_proto_out=protos protos/user.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb --ts_proto_opt=addGrpcMetadata=true
protoc --plugin=node_modules/.bin/protoc-gen-ts_proto -I=./protos --ts_proto_out=protos protos/auth.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb --ts_proto_opt=addGrpcMetadata=true
protoc --plugin=node_modules/.bin/protoc-gen-ts_proto -I=./protos --ts_proto_out=protos protos/post.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb --ts_proto_opt=addGrpcMetadata=true
protoc --plugin=node_modules/.bin/protoc-gen-ts_proto -I=./protos --ts_proto_out=protos protos/job.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb --ts_proto_opt=addGrpcMetadata=true
protoc --plugin=node_modules/.bin/protoc-gen-ts_proto -I=./protos --ts_proto_out=protos protos/messaging.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb --ts_proto_opt=addGrpcMetadata=true
protoc --plugin=node_modules/.bin/protoc-gen-ts_proto -I=./protos --ts_proto_out=protos protos/notification.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb --ts_proto_opt=addGrpcMetadata=true