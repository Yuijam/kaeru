FROM node:12.16.0-alpine

WORKDIR /usr/src/app
COPY dataser .
RUN mkdir -p /usr/src/app/db && yarn install --production && yarn run dbup

EXPOSE 5555
CMD [ "yarn", "run", "s" ]