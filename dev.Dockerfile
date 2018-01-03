# Choose base-image
FROM node:latest

# Define app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Install nodemon
RUN npm install -g nodemon

# Set Environment varibles
ENV NODE_ENV "dev"

# Copy source code
COPY server server/
COPY static static/

# Start container & expose port 80 (internal)
EXPOSE 80
CMD nodemon  --inspect=0.0.0.0 --experimental-modules server/index.mjs -e mjs
