#!/bin/bash
docker pull shoutaku/kaeru:v1
docker rm -f kaeru
docker run -d -p 5555:5555 -p 3000:3000 --name kaeru -v ~/kaerudb:/usr/src/db -v ~/kaerulog:/usr/src/app/log shoutaku/kaeru:v1