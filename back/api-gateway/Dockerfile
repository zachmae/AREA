# Create app directory
FROM node:8.9.4-alpine
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json ./
RUN npm install
# Bundle app source
COPY . .
EXPOSE 8080
CMD [ "node", "app.js" ]