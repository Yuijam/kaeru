FROM node:12.16.0-alpine

RUN mkdir -p /usr/src/app/client && mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/client
COPY client .
RUN yarn global add @angular/cli && \
    yarn install && \
    yarn run build

WORKDIR /usr/src/app/server
COPY server .
RUN yarn install --production=true && yarn run dbup && mv /usr/src/app/client/dist ./static

FROM node:12.16.0-alpine
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app/server .
ENV TZ=Asia/Tokyo KAERU_ENV=production
VOLUME /usr/src/db /usr/src/app/log
EXPOSE 3000 5555
CMD [ "yarn", "run", "s" ]