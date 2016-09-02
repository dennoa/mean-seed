'use strict';

var path = require('path');
var _ = require('lodash');
var env = process.env.NODE_ENV || 'development';
const ob = require('config-obfuscator')({ filename: __dirname + '/ob.cfg', key: process.env.CONFIG_KEY });

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
      secret: 'AUTH_JWT_SECRET'
    },
    google: {
      clientSecret: 'AUTH_GOOGLE_SECRET'
    },
    github: {
      clientSecret: 'AUTH_GITHUB_SECRET'
    },
    linkedin: {
      clientSecret: 'AUTH_LINKEDIN_SECRET'
    },
    facebook: {
      clientSecret: 'AUTH_FACEBOOK_SECRET'
    }
  },

  proxy: null

};

module.exports = _.merge(all, require('./' + all.env + '.js'), ob.get(all.env));
