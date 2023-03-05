
# pull official base image
FROM node:18.12.1-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . .

# expose port 8081
EXPOSE 7357

# need to find  a way to copy the client.apk to the public folder without fail possibility
#RUN cp ./shared/android.apk ./public/client.apk

# start app
CMD ["npm", "start"]