FROM node:12.16.0-alpine

RUN mkdir -p /usr/src/app/client/dist/kaieru
WORKDIR /usr/src/app/client
COPY client /usr/src/app/client
RUN npm install
RUN npm run build

RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server
COPY ./server /usr/src/app/server
RUN npm install
RUN rm -rf /usr/src/app/server/client
RUN mv /usr/src/app/client/dist/kaieru /usr/src/app/server/client
EXPOSE 3000
CMD [ "npm", "run", "s" ]