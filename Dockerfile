FROM node:alpine

WORKDIR /app

COPY package.json ormconfig.ts ./
COPY .env .

RUN yarn

COPY ./ ./
COPY ormconfig.docker.ts ./ormconfig.ts

EXPOSE 3333

CMD [ "yarn", "dev:server" ]
