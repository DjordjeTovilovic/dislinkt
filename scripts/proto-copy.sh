#!/bin/bash

mkdir ./api-gateway/src/protos
mkdir ./microservices/user/src/protos
mkdir ./microservices/auth/src/protos

cp ./protos/* ./api-gateway/src/protos
cp ./protos/* ./microservices/user/src/protos
cp ./protos/* ./microservices/auth/src/protos