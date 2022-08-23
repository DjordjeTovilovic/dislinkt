#!/bin/bash

cd api-gateway && npm run build && cd - &&
cd microservices/auth && npm run build && cd - &&
cd microservices/user && npm run build && cd - &&
cd microservices/post && npm run build && cd - &&
cd microservices/job && npm run build && cd - &&
cd microservices/messaging && npm run build && cd - &&
cd joberty && npm run build && cd - 
