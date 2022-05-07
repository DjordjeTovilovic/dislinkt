#!/bin/bash

cd api-gateway && npm run lint && cd -
cd microservices/auth && npm run lint && cd -
cd microservices/user && npm run lint && cd -
cd microservices/post && npm run lint && cd -
