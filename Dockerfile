FROM node:slim
WORKDIR /omdb
COPY . /omdb
RUN npm install
EXPOSE 5000
CMD node index.mjs