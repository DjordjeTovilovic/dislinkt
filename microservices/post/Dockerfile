FROM node:16-alpine as build

WORKDIR /usr/local/post

COPY dist package.json ./

RUN npm install --production

FROM node:16-alpine

WORKDIR /usr/local/post

COPY --from=build /usr/local/post .

EXPOSE 50053

CMD ["node", "main.js"]
