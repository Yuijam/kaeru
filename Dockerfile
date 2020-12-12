FROM node:12.16.0-alpine

WORKDIR /usr/src/app
COPY client .
RUN yarn global add @angular/cli && \
    yarn install && \
    yarn run build

FROM node:12.16.0-alpine
WORKDIR /usr/src/app
COPY server .
RUN mkdir static && yarn install --production && yarn run dbup
COPY --from=0 /usr/src/app/dist ./static
ENV TZ=Asia/Tokyo KAERU_ENV=production
VOLUME /usr/src/db /usr/src/app/log
EXPOSE 3000 5555
CMD [ "yarn", "run", "s" ]