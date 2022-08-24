#!/bin/bash

npx kill-port --port 3000,3001,8000,50051,50052,50053,50054,50055 &
cd api-gateway && npm run start:dev && cd - &
cd microservices/auth && npm run start:dev && cd - &
cd microservices/user && npm run start:dev && cd - &
cd microservices/post && npm run start:dev && cd - &
cd microservices/job && npm run start:dev && cd - &
cd microservices/messaging && npm run start:dev && cd - &
cd dislinkt-react-app && npm run start && cd - &
cd joberty && npm run start:dev && cd -
