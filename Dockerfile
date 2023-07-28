FROM node:lts-alpine18.17
FROM redis
WORKDIR /omdb
COPY . /omdb
RUN apt-get install npm
RUN npm install
RUN npm run build
EXPOSE 5003
CMD node dist/app.js