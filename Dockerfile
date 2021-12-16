FROM node:14.16.0 AS builder

WORKDIR /var/www/app

COPY package*.json ./

RUN npm install
RUN npm rebuild node-sass --sass-binary-name=linux-x64-83

COPY . ./

ARG REACT_APP_NODE_ENV
ARG REACT_APP_API
ARG REACT_APP_FIREBASE_API_KEY
ARG REACT_APP_FIREBASE_AUTH_DOMAIN
ARG REACT_APP_FIREBASE_PROJECT_ID
ARG REACT_APP_FIREBASE_PROJECT_BUCKET
ARG REACT_APP_FIREBASE_MESSAGE_ID
ARG REACT_APP_FIREBASE_APP_ID
ARG REACT_APP_MEASURE_ID

ENV REACT_APP_NODE_ENV $REACT_APP_NODE_ENV
ENV REACT_APP_API $REACT_APP_API
ENV REACT_APP_FIREBASE_API_KEY $REACT_APP_FIREBASE_API_KEY
ENV REACT_APP_FIREBASE_AUTH_DOMAIN $REACT_APP_FIREBASE_AUTH_DOMAIN
ENV REACT_APP_FIREBASE_PROJECT_ID $REACT_APP_FIREBASE_PROJECT_ID
ENV REACT_APP_FIREBASE_PROJECT_BUCKET $REACT_APP_FIREBASE_PROJECT_BUCKET
ENV REACT_APP_FIREBASE_MESSAGE_ID $REACT_APP_FIREBASE_MESSAGE_ID
ENV REACT_APP_FIREBASE_APP_ID $REACT_APP_FIREBASE_APP_ID
ENV REACT_APP_MEASURE_ID $REACT_APP_MEASURE_ID

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




