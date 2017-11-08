FROM node:8.9.0

RUN mkdir -p /tests

WORKDIR /tests

COPY package.json /tests

RUN npm i

COPY . /tests
