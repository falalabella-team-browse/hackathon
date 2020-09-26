FROM node:lts-alpine AS builder

WORKDIR /app

COPY website /app/website
COPY plugin /app/plugin
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lok

RUN yarn install -W

RUN yarn workspace plugin build
RUN yarn workspace website build:server

FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app/website/build /app/public
COPY server/src /app/src
COPY server/package.json /app/package.json

RUN yarn install

CMD ["yarn", "run", "start"]