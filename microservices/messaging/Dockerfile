FROM node:18-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app/
RUN npm ci

# Bundle app source
COPY . /usr/src/app

EXPOSE 50055
CMD [ "npm", "start" ]