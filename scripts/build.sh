#!/bin/bash

cd api-gateway && npm run build && cd -
cd microservices/auth && npm run build && cd -
cd microservices/user && npm run build && cd -
cd microservices/post && npm run build && cd -
