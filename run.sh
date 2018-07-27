# Spins up the dev site and runs functional & visual inside a docker compose netowkr.

# Avoid "Mount denied" errors for Chrome/Firefox containers on Windows
# See https://github.com/docker/for-win/issues/1829#issuecomment-376328022
export COMPOSE_CONVERT_WINDOWS_PATHS=1
export COMPOSE_PROJECT_NAME=tophat

# Delete existing docker outputted error shots as we'll copy any new ones out
mkdir -p docker-output/screenshots/taken docker-output/screenshots/diff docker-output/errorShots
rm -rf docker-output/screenshots/taken/*
rm -rf docker-output/screenshots/diff/*
rm -rf docker-output/errorShots/*

# Clean up before starting containers
docker-compose down && docker-compose rm -vf
docker-compose build && docker-compose up -d
docker-compose run tests npm run test:visual -- wdio.docker.conf.js --host hub
docker-compose run tests npm run test:functional -- wdio.docker.conf.js --host hub

docker-compose logs --no-color > ./docker-output/logs.txt

# Uncomment this line to run commands in the tests container - useful for debugging
#winpty docker exec -it tophat_tests bash

# Clean up - removed named volumes
docker-compose down
#docker volume rm $(docker volume ls -qf name="screenshots")
#docker volume rm $(docker volume ls -qf name="errorShots")
