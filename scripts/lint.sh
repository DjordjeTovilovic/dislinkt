#!/bin/bash

cd api-gateway && npm run lint && cd -
cd microservices/user && npm run lint && cd -
