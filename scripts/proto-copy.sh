#!/bin/bash

mkdir ./api-gateway/src/protos
mkdir ./microservices/user/src/protos
mkdir ./microservices/auth/src/protos
mkdir ./microservices/post/src/protos
mkdir ./microservices/job/src/protos
mkdir ./microservices/messaging/src/protos

cp ./protos/* ./api-gateway/src/protos -r
cp ./protos/* ./microservices/user/src/protos -r
cp ./protos/* ./microservices/auth/src/protos -r
cp ./protos/* ./microservices/post/src/protos -r
cp ./protos/* ./microservices/job/src/protos -r
cp ./protos/* ./microservices/messaging/src/protos -r