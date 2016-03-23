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
  
  supportedHostnames: null

};

module.exports = _.merge(all, require('./' + all.env + '.js'));
