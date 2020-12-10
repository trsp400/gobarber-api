FROM node:alpine

WORKDIR /app

COPY package.json yarn.* ./
COPY ormconfig.json ./

RUN yarn

COPY . .

EXPOSE 3333

CMD [ "yarn", "dev:server" ]
