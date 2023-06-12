# syntax=docker/dockerfile:1.2

FROM node:18.14.0-alpine3.17 AS build-stage

LABEL maintainer="Roman Gonzalez <roman.gonzalez.ea@gmail.com>"

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

# hadolint ignore=DL3018
RUN set -ex; \
  apk add --no-cache --virtual .build-deps g++ make py3-pip && \
  yarn install --frozen-lockfile && \
  apk del .build-deps

ARG BACKEND_URL
ARG DATABASE_URL

COPY . .
RUN set -ex; \
  NODE_ENV=production yarn build

FROM node:18.14.0-alpine3.17 AS production-stage

LABEL maintainer="Roman Gonzalez <roman.gonzalez.ea@gmail.com>"

WORKDIR /srv/www/api

RUN yarn global add pm2

COPY package.json yarn.lock ./

# hadolint ignore=DL3018
RUN set -ex; \
  apk add --no-cache --virtual .build-deps g++ make py3-pip && \
  yarn ci && \
  apk del .build-deps

COPY --from=build-stage /app .

ARG PORT=3000
ENV PORT=${PORT}
EXPOSE ${PORT}

CMD ["pm2-runtime" , "start", "ecosystem.config.js"]
