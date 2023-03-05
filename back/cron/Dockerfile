FROM node:19-alpine3.16

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8084

CMD [ "npm", "start" ]