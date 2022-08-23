#!/bin/bash

npm i &&
cd api-gateway && npm i && cd - &&
cd microservices/auth && npm i && cd - &&
cd microservices/user && npm i && cd - &&
cd microservices/post && npm i && cd - &&
cd microservices/job && npm i && cd - &&
cd joberty && npm i && cd - 
