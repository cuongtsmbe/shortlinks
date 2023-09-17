FROM node:18.12.1-alpine

RUN npm install -g @nestjs/cli
RUN apk --no-cache add curl
RUN npm i -g typeorm
RUN apk update && apk add busybox-extras
RUN npm install -g npm@latest

WORKDIR /data/app
COPY . .

RUN npm install -f 

EXPOSE 3000

CMD ["npm", "run", "start:dev"]