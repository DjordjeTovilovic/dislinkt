FROM node:16-alpine as build

WORKDIR /usr/local/user

COPY dist package.json ./

RUN npm install --production

FROM node:16-alpine

WORKDIR /usr/local/user

COPY --from=build /usr/local/user .

EXPOSE 50051

CMD ["node", "main.js"]
