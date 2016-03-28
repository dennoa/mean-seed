FROM node:5.9.0
MAINTAINER Andrew Dennison "andrew.dennison@live.com.au"

# Install app dependencies
RUN npm install

#Build the app
RUN npm build

# Create app directory
RUN mkdir -p /usr/src/app

# Copy node modules
COPY node_modules /usr/src/app

# Copy app source
COPY dist /usr/src/app

EXPOSE 9000
CMD [ "npm", "start" ]