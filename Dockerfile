FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN npm install

COPY server server/
COPY static static/


EXPOSE 80
ENTRYPOINT [ "npm", "start" ]