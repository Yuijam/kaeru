#!/bin/bash

docker rm -f kaeru_dataser
docker rmi kaeru_dataser

docker-compose up -d

docker exec kaeru_dataser npm run prod-dbup