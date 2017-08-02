docker-compose down && docker-compose rm -vf
docker-compose build && docker-compose up -d
docker-compose run tests npm run visualRegression -- --host selenium
docker cp  nicetophat_tests_1:/tests/screenshots ./screenshots_copy
docker rm -vf $(docker ps -aq) && docker volume rm nicetophat_screenshots

result=$?
exit $result
