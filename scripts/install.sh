#!/bin/bash

npm install -g @nestjs/cli &&
cd api-gateway && npm i && cd -
cd microservices/auth && npm i && cd -
cd microservices/user && npm i && cd -
cd microservices/post && npm i && cd -
