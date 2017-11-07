FROM node:8.9.0

ADD . /tests
WORKDIR /tests

RUN npm i
