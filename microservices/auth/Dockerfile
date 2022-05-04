FROM node:16-alpine as build

WORKDIR /usr/local/auth

COPY dist package.json ./

RUN npm install --production

FROM node:16-alpine

WORKDIR /usr/local/auth

COPY --from=build /usr/local/auth .

EXPOSE 50052

CMD ["node", "main.js"]
