'use strict';

var should = require('should');
var rewire = require('rewire');
var config = require('../../config/environment');
var linkedin = rewire('./index');

describe('LinkedIn OAuth provider handler', function() {

  var mocks, revert;
  var errText = 'expected for testing';
  var mockRequest = {
    get: function(options, cb) { cb(errText); },
    post: function(options, cb) { cb(errText); }
  };

  beforeEach(function(done) {
    mocks = {
      request: mockRequest
    };
    revert = linkedin.__set__(mocks);
    done();
  });

  afterEach(function(done) {
    revert();
    done();
  });

  it('should retrieve the token from linkedin', function(done) {
    var clientParams = {
      code: 'some code from linkedin',
      clientId: 'the linkedin client id for the project',
      redirectUri: 'http://acceptable.for.project.com.au'
    };
    mockRequest.post = function(options, cb) {
      options.url.should.equal(config.auth.linkedin.tokenEndpoint);
      options.form.code.should.equal(clientParams.code);
      options.form.client_id.should.equal(clientParams.clientId);
      options.form.redirect_uri.should.equal(clientParams.redirectUri);
      options.form.client_secret.should.equal(config.auth.linkedin.clientSecret);
      options.form.grant_type.should.equal('authorization_code');
      options.json.should.equal(true);
      should(options.proxy).equal(config.proxy);
      cb(errText);
    };
    linkedin(clientParams, function(err, userInfo) {
      err.should.equal(errText);
      done();
    });
  });

  it('should return token errors from linkedin', function(done) {
    var token = {
      error: 'bad_stuff',
      error_description: 'some bad stuff happened'
    };
    mockRequest.post = function(options, cb) {
      cb(null, null, token);
    };
    linkedin({}, function(err, userInfo) {
      err.should.equal(token);
      done();
    });
  });

  it('should use the token to retrieve user information from linkedin', function(done) {
    var token = {
      access_token: 'some_access_token'
    };
    mockRequest.post = function(options, cb) {
      cb(null, null, token);
    };
    mockRequest.get = function(options, cb) {
      options.url.should.equal(config.auth.linkedin.userInfoEndpoint);
      options.headers.Authorization.should.equal('Bearer ' + token.access_token);
      options.json.should.equal(true);
      should(options.proxy).equal(config.proxy);
      cb(errText);
    };
    linkedin({}, function(err, userInfo) {
      err.should.equal(errText);
      done();
    });
  });

  it('should return user information access errors from linkedin', function(done) {
    var token = {
      access_token: 'some_access_token'
    };
    mockRequest.post = function(options, cb) {
      cb(null, null, token);
    };
    var linkedinUser = {
      error: 'bad_stuff',
      error_description: 'some bad stuff happened'
    };
    mockRequest.get = function(options, cb) {
      cb(null, null, linkedinUser);
    };
    linkedin({}, function(err, userInfo) {
      err.should.equal(linkedinUser);
      done();
    });
  });

  it('should return user information from linkedin', function(done) {
    var token = {
      access_token: 'some_access_token'
    };
    mockRequest.post = function(options, cb) {
      cb(null, null, token);
    };
    var linkedInUser = {
      emailAddress: 'my.email@home.com',
      firstName: 'My',
      lastName: 'Name',
      pictureUrl: 'http://my-picture.com'
    };
    mockRequest.get = function(options, cb) {
      cb(null, null, linkedInUser);
    };
    linkedin({}, function(err, userInfo) {
      userInfo.email.should.equal(linkedInUser.emailAddress);
      userInfo.name.should.equal(linkedInUser.firstName + ' ' + linkedInUser.lastName);
      userInfo.picture.should.equal(linkedInUser.pictureUrl);
      done();
    });
  });

});
