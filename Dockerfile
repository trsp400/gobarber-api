FROM node:alpine


WORKDIR /app

COPY package.json yarn.* ./
COPY ormconfig.docker.json ./ormconfig.json
COPY .env .

RUN yarn

COPY ./ ./

EXPOSE 3333

CMD [ "yarn", "dev:server" ]
