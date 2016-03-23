'use strict';

describe('Header Controller', function() {

  beforeEach(module('meanSeed'));

  var HeaderCtrl, scope, clientConfigCallback;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();

    var clientConfig = {
      then: function(callback) {
        clientConfigCallback = callback;
      }
    };

    HeaderCtrl = $controller('HeaderCtrl', {
      $scope: scope,
      clientConfig: clientConfig
    });
  }));

  it('should set the environment identifier from the client config', function() {
    var config = {
      env: 'my-env'
    };
    clientConfigCallback(config);
    expect(scope.env).toEqual(config.env);
  });

});
