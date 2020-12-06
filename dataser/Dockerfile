FROM node:12.16.0-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/db
COPY dataser /usr/src/app/dataser
COPY shared /usr/src/app/shared

WORKDIR /usr/src/app/dataser
RUN npm install
WORKDIR /usr/src/app/shared
RUN npm install
RUN npm run setup

WORKDIR /usr/src/app/dataser
RUN npm run prod-dbup
RUN npm run b

EXPOSE 5555
CMD [ "node", "dist/index.js" ]