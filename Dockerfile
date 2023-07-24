FROM node:slim
WORKDIR /simple-auth
COPY . /simple-auth
RUN npm install
EXPOSE 5000
CMD node index.js