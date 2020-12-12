#!/bin/bash

docker run -d -p 5555:5555 -p 3000:3000 --name kaeru -v ~/kaerudb:/usr/src/db -v ~/kaerulog:/usr/src/app/log kaeru:latest
docker exec kaeru yarn run dbup
