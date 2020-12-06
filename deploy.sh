#!/bin/bash

docker-compose up -d

docker exec kaeru_dataser npm run prod-dbup