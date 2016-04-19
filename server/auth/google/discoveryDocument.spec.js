'use strict';

var should = require('should');
var rewire = require('rewire');
var discoveryDocument = rewire('./discoveryDocument');
var config = require('../../config/environment');
var fs = require('fs');

describe('Google Discovery Document lookup', function() {

  var mocks, revert;
  var errText = 'expected for testing';
  var mockRequest = {
    get: function(options, cb) { cb(errText); }
  };
  var mockFs = {
    readFile: fs.readFile
  };

  beforeEach(function(done) {
    mocks = {
      request: mockRequest,
      fs: mockFs
    };
    revert = discoveryDocument.__set__(mocks);
    discoveryDocument.refresh();
    done();
  });

  afterEach(function(done) {
    revert();
    done();
  });

  it('should retrieve the discovery document from google', function(done) {
    var googleDoc = { authorization_endpoint: 'https;//some.endpoint.com' };
    mockRequest.get = function(options, cb) {
      options.url.should.equal(config.auth.google.discoveryDocumentUrl);
      options.json.should.equal(true);
      should(options.proxy).equal(config.proxy);
      cb(null, null, googleDoc);
    };
    discoveryDocument.get().then(function(doc) {
      doc.should.equal(googleDoc);
      done();
    });
  });

  it('should use the default discovery document if the google lookup fails', function(done) {
    mockRequest.get = function(options, cb) {
      cb(errText);
    };
    discoveryDocument.get().then(function(doc) {
      doc.authorization_endpoint.should.equal('https://accounts.google.com/o/oauth2/v2/auth');
      done();
    }, done);
  });

  it('should cache the discovery document between requested refreshes', function(done) {
    var googleDoc = { authorization_endpoint: 'https;//some.endpoint.com' };
    mockRequest.get = function(options, cb) {
      cb(null, null, googleDoc);
    };
    discoveryDocument.get().then(function(doc) {
      doc.should.equal(googleDoc);

      mockRequest.get = function(options, cb) {
        cb('unexpected error - this should not have been invoked');
      };
      discoveryDocument.get().then(function(doc) {
        doc.should.equal(googleDoc);
        done();
      });
    }, done);
  });
  
  it('should return an error when failing to load the default discovery document', function(done) {
    mockRequest.get = function(options, cb) {
      cb(errText);
    };
    mockFs.readFile = function(path, encoding, cb) {
      cb(errText);
    };
    discoveryDocument.get().then(function(doc) {
      done('failed to return error from loading default doc');
    }, function(err) {
      err.should.equal(errText);
      done();
    });    
  });

});
