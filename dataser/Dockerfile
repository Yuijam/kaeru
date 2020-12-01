FROM node:12.16.0-alpine

RUN mkdir -p /usr/src/app/dataser
RUN mkdir -p /usr/src/app/shared
COPY dataser /usr/src/app/dataser
COPY shared /usr/src/app/shared

WORKDIR /usr/src/app/dataser
RUN npm install
WORKDIR /usr/src/app/shared
RUN npm install
RUN npm run init

WORKDIR /usr/src/app/dataser
RUN npm run b

EXPOSE 3300
CMD [ "node", "dist/index.js" ]