FROM node:5.9.0
MAINTAINER Andrew Dennison "andrew.dennison@live.com.au"

#Build the app
CMD [ "npm", "build"]

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy app source
COPY dist /usr/src/app

# Install app dependencies
RUN npm install

EXPOSE 9000
CMD [ "npm", "start" ]