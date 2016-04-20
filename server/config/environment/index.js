'use strict';

var path = require('path');
var _ = require('lodash');
var env = process.env.NODE_ENV || 'development';

var all = {

  env: env,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 9000,

  mongo: {
    uri: 'mongodb://uldcop002/mean-seed-' + env,
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
      secret: process.env.AUTH_JWT_SECRET || 'M3anS33dJwtS3cr3t'
    },
    google: {
      discoveryDocumentUrl: 'https://accounts.google.com/.well-known/openid-configuration',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || 'CLIENT_SECRET'
    },
    github: {
      tokenEndpoint: 'https://github.com/login/oauth/access_token',
      userInfoEndpoint: 'https://api.github.com/user',
      clientSecret: process.env.AUTH_GITHUB_SECRET || 'CLIENT_SECRET'
    },
    linkedin: {
      tokenEndpoint: 'https://www.linkedin.com/uas/oauth2/accessToken',
      userInfoEndpoint: 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-url)?format=json',
      clientSecret: process.env.AUTH_LINKEDIN_SECRET || 'CLIENT_SECRET'
    },
    facebook: {
      tokenEndpoint: 'https://graph.facebook.com/v2.5/oauth/access_token',
      userInfoEndpoint: 'https://graph.facebook.com/v2.5/me?fields=id,email,first_name,last_name,link,name',
      clientSecret: process.env.AUTH_FACEBOOK_SECRET || 'CLIENT_SECRET'
    }
  },

  proxy: null

};

module.exports = _.merge(all, require('./' + all.env + '.js'));
