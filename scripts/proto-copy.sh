#!/bin/bash

mkdir ./api-gateway/src/protos
mkdir ./microservices/user/src/protos
mkdir ./microservices/auth/src/protos
mkdir ./microservices/post/src/protos

cp ./protos/* ./api-gateway/src/protos -r
cp ./protos/* ./microservices/user/src/protos -r
cp ./protos/* ./microservices/auth/src/protos -r
cp ./protos/* ./microservices/post/src/protos -r