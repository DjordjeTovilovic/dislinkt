FROM node:16-alpine as build

WORKDIR /usr/local/api-gateway

COPY dist package.json ./

RUN npm install --production

FROM node:16-alpine

WORKDIR /usr/local/api-gateway

COPY --from=build /usr/local/api-gateway .

EXPOSE 3000

CMD ["node", "main.js"]
