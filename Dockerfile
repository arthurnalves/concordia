# Dockerfile
FROM node:16.14.2

WORKDIR /home/usr/app

COPY . /home/usr/app

RUN npm install -g nodemon
RUN yarn install

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]
