FROM node:6.9.0

ADD . /tests
WORKDIR /tests

RUN npm i -g npm

RUN npm i
