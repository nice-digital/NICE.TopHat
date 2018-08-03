FROM node:8.11.3

EXPOSE 8000

RUN mkdir -p /tests/errorShots

WORKDIR /tests

RUN npm i -g npm@6.2.0

COPY package.json /tests
COPY package-lock.json /tests

RUN npm ci

COPY . /tests

CMD tail -f /dev/null
