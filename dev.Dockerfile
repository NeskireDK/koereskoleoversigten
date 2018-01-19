# Choose base-image
FROM node:latest

# Define app directory
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install -g nodemon && npm install -g bower
RUN echo '{ "allow_root": true }' > /root/.bowerrc

COPY package.json ./
RUN npm install

# Set Environment varibles
ENV NODE_ENV "dev"

# Bower dependencies
COPY static_driverschool/bower.json static_driverschool/
COPY static_frontend/bower.json static_frontend/
RUN cd static_driverschool && bower install && cd ../ && cd static_frontend && bower install && cd ../

# Copy source code
COPY server server/
COPY static_driverschool static_driverschool/
COPY static_frontend static_frontend/

# Start container & expose port 80 (internal)
EXPOSE 80 9229
CMD nodemon  --inspect=0.0.0.0 --experimental-modules server/index.mjs -e mjs
