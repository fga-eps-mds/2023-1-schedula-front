FROM node:lts-alpine

WORKDIR /app

COPY ./package.json /app/

COPY ./yarn.lock /app/

RUN yarn

COPY . /app

RUN yarn build

EXPOSE 80

CMD ["yarn", "start"]