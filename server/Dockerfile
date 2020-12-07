FROM node:12.16.0-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/db

COPY server /usr/src/app/server
RUN mkdir -p /usr/src/app/server/static

COPY shared /usr/src/app/shared
COPY client /usr/src/app/client

WORKDIR /usr/src/app/server
RUN yarn install

WORKDIR /usr/src/app/client
RUN npm install -g @angular/cli
RUN npm install
RUN npm run build
RUN mv /usr/src/app/client/dist/kaieru /usr/src/app/server/static/kaieru
RUN rm -rf /usr/src/app/client/


WORKDIR /usr/src/app/shared
RUN npm install
RUN npm run setup

WORKDIR /usr/src/app/server
RUN npm run prod-dbup

EXPOSE 3000
CMD [ "npm", "run", "s" ]