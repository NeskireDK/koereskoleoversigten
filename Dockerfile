# Choose base-image
FROM node:carbon

# Define app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Set Environment varibles
ENV NODE_ENV "Production"

# Copy source code
COPY server server/
COPY static static/

# Start container & expose port 80 (internal)
EXPOSE 80
ENTRYPOINT [ "npm", "start" ]
