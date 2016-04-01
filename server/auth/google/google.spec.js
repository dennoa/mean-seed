'use strict';

var should = require('should');
var rewire = require('rewire');
var fs = require('fs');
var config = require('../../config/environment');
var google = rewire('./index');

describe('Google OAuth provider handler', function() {

  var mocks, revert;
  var mockDiscoveryDocument = {
    get: function() {
      return new Promise(function(resolve) {
        fs.readFile(__dirname + '/defaultDiscoveryDocument.json', 'utf8', function(err, doc) {
          resolve(JSON.parse(doc));
        });
      });
    }
  };
  var errText = 'expected for testing';
  var mockRequest = {
    get: function(options, cb) { cb(errText); },
    post: function(options, cb) { cb(errText); }
  };

  beforeEach(function(done) {
    mocks = {
      discoveryDocument: mockDiscoveryDocument,
      request: mockRequest
    };
    revert = google.__set__(mocks);
    done();
  });

  afterEach(function(done) {
    revert();
    done();
  });

  it('should get the discovery document', function(done) {
    var res = {
      status: function(code) {
        code.should.equal(200);
        return {
          json: function(doc) {
            doc.authorization_endpoint.should.equal('https://accounts.google.com/o/oauth2/v2/auth');
            done();
          }
        }
      }
    };
    google.discoveryDocument(null, res);
  });

  it('should retrieve the token from google', function(done) {
    var clientParams = {
      code: 'some code from google',
      clientId: 'the google client id for the project',
      redirectUri: 'http://acceptable.for.project.com.au'
    };
    mockRequest.post = function(options, cb) {
      options.url.should.equal('https://www.googleapis.com/oauth2/v4/token');
      options.form.code.should.equal(clientParams.code);
      options.form.client_id.should.equal(clientParams.clientId);
      options.form.redirect_uri.should.equal(clientParams.redirectUri);
      options.form.client_secret.should.equal(config.auth.google.clientSecret);
      options.form.grant_type.should.equal('authorization_code');
      options.json.should.equal(true);
      should(options.proxy).equal(config.proxy);
      cb(errText);
    };
    google.auth(clientParams, function(err, userInfo) {
      err.should.equal(errText);
      done();
    });
  });

  it('should return token errors from google', function(done) {
    var tokenDoc = {
      error: 'bad_stuff',
      error_description: 'some bad stuff happened'
    };
    mockRequest.post = function(options, cb) {
      cb(null, null, tokenDoc);
    };
    google.auth({}, function(err, userInfo) {
      err.should.equal(tokenDoc);
      done();
    });
  });

  it('should use the token to retrieve user information from google', function(done) {
    var tokenDoc = {
      access_token: 'some_access_token'
    };
    mockRequest.post = function(options, cb) {
      cb(null, null, tokenDoc);
    };
    mockRequest.get = function(options, cb) {
      options.url.should.equal('https://www.googleapis.com/oauth2/v3/userinfo');
      options.headers.Authorization.should.equal('Bearer ' + tokenDoc.access_token);
      options.json.should.equal(true);
      should(options.proxy).equal(config.proxy);
      cb(errText);
    };
    google.auth({}, function(err, userInfo) {
      err.should.equal(errText);
      done();
    });
  });

  it('should return user information access errors from google', function(done) {
    var tokenDoc = {
      access_token: 'some_access_token'
    };
    mockRequest.post = function(options, cb) {
      cb(null, null, tokenDoc);
    };
    var googleUser = {
      error: 'bad_stuff',
      error_description: 'some bad stuff happened'
    };
    mockRequest.get = function(options, cb) {
      cb(null, null, googleUser);
    };
    google.auth({}, function(err, userInfo) {
      err.should.equal(googleUser);
      done();
    });
  });

  it('should return user information from google', function(done) {
    var tokenDoc = {
      access_token: 'some_access_token'
    };
    mockRequest.post = function(options, cb) {
      cb(null, null, tokenDoc);
    };
    var googleUser = {
      email: 'my.email@home.com',
      name: 'My Name'
    };
    mockRequest.get = function(options, cb) {
      cb(null, null, googleUser);
    };
    google.auth({}, function(err, userInfo) {
      userInfo.should.equal(googleUser);
      done();
    });
  });

});
