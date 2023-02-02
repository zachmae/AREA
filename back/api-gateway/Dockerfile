FROM node:19-alpine

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

EXPOSE 8080

CMD [ "node", "app.js" ]
