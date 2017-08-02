FROM node:6.9.0

ADD . /tests
WORKDIR /tests

RUN npm i
# RUN npm start

# EXPOSE 8000
# RUN npm start
