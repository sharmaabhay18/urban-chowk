FROM node:14.16.0 AS builder

WORKDIR /var/www/app

COPY package*.json ./

RUN npm install
RUN npm rebuild node-sass --sass-binary-name=linux-x64-83

COPY . ./

ARG NODE_ENV
ARG API
ARG FIREBASE_API_KEY
ARG FIREBASE_AUTH_DOMAIN
ARG FIREBASE_PROJECT_ID
ARG FIREBASE_PROJECT_BUCKET
ARG FIREBASE_MESSAGE_ID
ARG FIREBASE_APP_ID
ARG MEASURE_ID

ENV NODE_ENV $NODE_ENV
ENV API $API
ENV FIREBASE_API_KEY $FIREBASE_API_KEY
ENV FIREBASE_AUTH_DOMAIN $FIREBASE_AUTH_DOMAIN
ENV FIREBASE_PROJECT_ID $FIREBASE_PROJECT_ID
ENV FIREBASE_PROJECT_BUCKET $FIREBASE_PROJECT_BUCKET
ENV FIREBASE_MESSAGE_ID $FIREBASE_MESSAGE_ID
ENV FIREBASE_APP_ID $FIREBASE_APP_ID
ENV MEASURE_ID $MEASURE_ID

RUN npm run build

ENV NODE_ENV=production

FROM nginx:1.17-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY ./nginx.conf /etc/nginx/nginx.template
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
COPY --from=builder /var/www/app/build /usr/share/nginx/html




