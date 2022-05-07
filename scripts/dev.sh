#!/bin/bash

cd api-gateway && npm run start:dev && cd - &
cd microservices/auth && npm run start:dev && cd - &
cd microservices/user && npm run start:dev && cd - &
cd microservices/post && npm run start:dev && cd -
