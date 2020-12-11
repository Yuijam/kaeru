FROM node:12.16.0-alpine

RUN mkdir -p /usr/src/app && mkdir -p /usr/src/app/db
COPY dataser /usr/src/app

WORKDIR /usr/src/app
RUN yarn install && yarn run dbup

EXPOSE 5555
CMD [ "yarn", "run", "s" ]