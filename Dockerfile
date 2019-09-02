FROM node:latest
RUN mkdir /src
WORKDIR /src
ADD package.json /src/package.json
RUN npm install
COPY . .
EXPOSE 3000
CMD node server/server.js