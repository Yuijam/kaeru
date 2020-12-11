FROM node:12.16.0-alpine

RUN mkdir -p /usr/src/app/server/static && mkdir -p /usr/src/app/db && mkdir -p /usr/src/app/client

COPY server /usr/src/app/server
COPY client /usr/src/app/client

WORKDIR /usr/src/app/client
RUN yarn global add @angular/cli && \
    yarn install && \
    yarn run build && \
    yarn global remove @angular/cli && \
    mv /usr/src/app/client/dist/kaieru /usr/src/app/server/static/kaieru && \
    rm -rf /usr/src/app/client/

WORKDIR /usr/src/app/server
RUN yarn install && yarn run dbup

EXPOSE 3000
CMD [ "yarn", "run", "s" ]