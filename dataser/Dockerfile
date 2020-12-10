FROM node:12.16.0-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/db
COPY dataser /usr/src/app/dataser
COPY shared /usr/src/app/shared

WORKDIR /usr/src/app/dataser
RUN yarn install
WORKDIR /usr/src/app/shared
RUN yarn run setup

WORKDIR /usr/src/app/dataser
RUN yarn run dbup
RUN yarn run b

EXPOSE 5555
CMD [ "node", "dist/index.js" ]