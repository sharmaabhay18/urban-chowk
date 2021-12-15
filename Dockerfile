FROM node:14.16.0 AS builder

WORKDIR /var/www/app

COPY package*.json ./

RUN npm install
RUN npm rebuild node-sass --sass-binary-name=linux-x64-83

COPY . ./

RUN npm run build

FROM nginx:1.17-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY ./nginx.conf /etc/nginx/nginx.template
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
COPY --from=builder /var/www/app/build /usr/share/nginx/html




