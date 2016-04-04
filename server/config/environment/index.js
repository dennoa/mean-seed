'use strict';

var path = require('path');
var _ = require('lodash');
var env = process.env.NODE_ENV || 'development';

var all = {

  env: env,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 9000,

  mongo: {
    uri: 'mongodb://some-mongo-server/mean-seed-' + env,
    options: {
      db: {
        safe: true
      }
    }
  },

  cors: {
    supportedHostnames: null
  },

  auth: {
    jwt: {
      secret: 'M3anS33dJwtS3cr3t'
    },
    google: {
      discoveryDocumentUrl: 'https://accounts.google.com/.well-known/openid-configuration',
      clientSecret: 'GOOGLE_CLIENT_SECRET'
    },
    github: {
      tokenEndpoint: 'https://github.com/login/oauth/access_token',
      userInfoEndpoint: 'https://api.github.com/user',
      clientSecret: 'GITHUB_CLIENT_SECRET'
    }
  },

  proxy: null

};

module.exports = _.merge(all, require('./' + all.env + '.js'));
