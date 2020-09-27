FROM node:lts-alpine

WORKDIR /app

COPY website/build /app/public
COPY server/src /app/src
COPY server/package.json /app/package.json

RUN yarn install

CMD ["yarn", "run", "start"]