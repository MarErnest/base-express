FROM node:11-slim

WORKDIR /app

RUN npm install -g yarn

RUN npm config set registry http://registry.npmjs.org

ADD package.json /app/package.json

ADD yarn.lock /app/yarn.lock

RUN yarn

ADD . /app

EXPOSE 3000 9229
