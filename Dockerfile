# Choose base-image
FROM node:latest

# Define app directory
WORKDIR /usr/src/app

RUN npm install -g bower && npm install -g --unsafe-perm polymer-cli && echo '{ "allow_root": true }' > /root/.bowerrc

COPY package.json ./
RUN npm install

# Set Environment varibles
ENV NODE_ENV "prod"

# Bower dependencies
COPY static_driverschool/bower.json static_driverschool/
COPY static_frontend/bower.json static_frontend/
RUN cd static_driverschool && bower install && cd ../ && cd static_frontend && bower install && cd ../

# Copy source code
COPY server server/
COPY static_driverschool static_driverschool/
COPY static_frontend static_frontend/

RUN cd static_driverschool && polymer build && cd ../ && cd static_frontend && polymer build && cd ../

# Start container & expose port 80 (internal)
EXPOSE 80
CMD [ "npm", "start" ]
