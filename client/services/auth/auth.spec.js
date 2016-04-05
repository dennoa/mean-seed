'use strict';

describe('Auth', function () {

  var $httpBackend;

  beforeEach(module('meanSeed'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    commonBeforeEach($httpBackend);
    $httpBackend.flush();
  }));

  afterEach(function() {
    commonAfterEach($httpBackend);
  });

  it('should set the google client id', inject(function(SatellizerConfig) {
    expect(SatellizerConfig.providers.google.clientId).toBeDefined();
  }));

  it('should set the google authorization endpoint from the google discovery document', inject(function(SatellizerConfig) {
    expect(SatellizerConfig.providers.google.authorizationEndpoint).toEqual('https://accounts.google.com/o/oauth2/v2/auth');
  }));

  it('should set the github client id', inject(function(SatellizerConfig) {
    expect(SatellizerConfig.providers.github.clientId).toBeDefined();
  }));

  it('should set the linkedin client id', inject(function(SatellizerConfig) {
    expect(SatellizerConfig.providers.linkedin.clientId).toBeDefined();
  }));

});
