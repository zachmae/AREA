FROM node:19-alpine3.16

WORKDIR /app

COPY package*.json ./
COPY prisma ./
COPY .env  ./

COPY . .

RUN npm install
RUN npx prisma generate

EXPOSE 7001

CMD npm start