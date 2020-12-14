#!/bin/bash
docker tag kaeru:latest shoutaku/kaeru:v1

docker image push shoutaku/kaeru:v1
