# Choose base-image
FROM node:latest

# Define app directory
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

# Set Environment varibles
ENV NODE_ENV "prod"

# Copy source code
COPY server server/
COPY static_driverschool static_driverschool/
COPY static_frontend static_frontend/

# Start container & expose port 80 (internal)
EXPOSE 80 9229
CMD [ "npm", "start" ]
