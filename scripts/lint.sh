#!/bin/bash

cd api-gateway && npm run lint && cd - &&
cd microservices/auth && npm run lint && cd - &&
cd microservices/user && npm run lint && cd - &&
cd microservices/post && npm run lint && cd - &&
cd microservices/job && npm run lint && cd - &&
cd microservices/messaging && npm run lint && cd - &&
cd dislinkt-react-app && npm run lint && cd - &&
cd joberty && npm run lint && cd - 
