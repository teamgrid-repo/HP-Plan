# Dockerfile for React client

# Build react client
FROM node:14-alpine as build 

# Working directory be app
WORKDIR /app

COPY package*.json ./

###  Installing dependencies

RUN npm install 

# copy local files to app folder
COPY . .

RUN npm run build 

FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html
