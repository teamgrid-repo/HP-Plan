#  Dockerfile for Node Express Backend

FROM node:14.16-alpine

WORKDIR /app

# Install Dependencies
COPY package*.json ./

#Run as production

ENV NODE_ENV=production
RUN npm install --production --silent
RUN npm install -g nodemon
# Copy app source code
COPY . .
EXPOSE 4000
# Exports
CMD ["npm","start"]


