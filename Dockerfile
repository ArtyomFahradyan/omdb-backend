FROM node:slim
WORKDIR /omdb
COPY . /omdb
RUN npm install
RUN npm run build
EXPOSE 5003
CMD node dist/app.js