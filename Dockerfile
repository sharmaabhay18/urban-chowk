FROM node:14.16.0

WORKDIR /var/www/app

COPY package*.json ./

RUN npm install
RUN npm rebuild node-sass --sass-binary-name=linux-x64-83

WORKDIR /var/www/app

COPY . .

ENV NODE_ENV=production

CMD [ "npm", "start" ]

