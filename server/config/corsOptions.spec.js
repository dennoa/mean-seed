'use strict';

var should = require('should');
var rewire = require('rewire');
var corsOptions = rewire('./corsOptions.js');
var _ = require('lodash');

describe('CORS options', function() {

  var mocks, revert;
  var acceptableOrigins = [
    'http://localhost:9000', 'https://my-good-domain.com.au'
  ];

  beforeEach(function(done) {
    mocks = {
      config: {
        cors: {
          supportedHostnames: /localhost|my\-good\-domain\.com\.au/
        }
      }
    };
    revert = corsOptions.__set__(mocks);
    done();
  });

  afterEach(function(done) {
    revert();
    done();
  });

  it('should allow requests from acceptable origins', function(done) {
    var tests = [];
    _.forEach(acceptableOrigins, function(origin) {
      tests.push(new Promise(function(resolve) {
        corsOptions.origin(origin, function(err, isSupported) {
          should(isSupported).equal(true);
          resolve();
        });
      }));
    });
    Promise.all(tests).then(function(results) {
      done();
    });
  });

  it('should not allow requests from unacceptable origins', function(done) {
    corsOptions.origin('http://some-evil.domain.com', function(err, isSupported) {
      should(isSupported).equal(false);
      done();
    });
  });

  it('should not allow CORS requests when there are no acceptable origins', function(done) {
    mocks.config.cors.supportedHostnames = null;
    corsOptions.origin('https://my-good-domain.com.au', function(err, isSupported) {
      should(isSupported).equal(false);
      done();
    });
  });

  it('should not allow CORS requests from invalid origins', function(done) {
    corsOptions.origin('not valid', function(err, isSupported) {
      should(isSupported).equal(false);
      done();
    });
  });

  it('should not allow CORS requests from null origins', function(done) {
    corsOptions.origin(null, function(err, isSupported) {
      should(isSupported).equal(false);
      done();
    });
  });

});
