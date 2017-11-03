FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy code
COPY server server/
COPY static static/

# Start container
EXPOSE 80
ENTRYPOINT [ "npm", "start" ]