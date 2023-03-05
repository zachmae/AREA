FROM node:19-alpine3.16

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "app.js" ]