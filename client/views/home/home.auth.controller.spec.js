'use strict';

describe('Home Auth Controller', function() {

  beforeEach(module('meanSeed'));

  var HomeAuthCtrl, scope, auth;
  var authFailure = { 
    then: function(success) {
      return {
        catch: function(error) {
          error('expected for testing');
        }
      };
    }
  };

  beforeEach(inject(function($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    auth = {
      authenticate: function(provider) {
        return authFailure;
      },
      getPayload: function() {
        return null;
      },
      isAuthenticated: function() {
        return false;
      }
    };
    HomeAuthCtrl = $controller('HomeAuthCtrl', {
      $scope: scope,
      $auth: auth
    });
  }));

  it('should initially indicate that the user is not authenticated', function() {
    expect(scope.isAuthenticated()).toBeFalsy();
  });
  
  it('should use satellizer to authenticate', inject(function($q) {
    var selectedProvider = { some: 'provider' };
    auth.authenticate = function(provider) {
      expect(provider).toBe(selectedProvider);
      return authFailure;
    };
    scope.authenticate(selectedProvider);
  }));
  
  it('should set the user information from the provider onto the scope', inject(function($q) {
    var returnedUserInfo = {
      name: 'Mr Authentic',
      email: 'me@home.com',
      picture: 'http://me.home.com/mypic'
    };
    auth.getPayload = function() {
      return returnedUserInfo;
    };
    auth.authenticate = function() {
      return {
        then: function(success) {
          success();
          expect(scope.userInfo).toEqual(returnedUserInfo);
          return {
            catch: function() {}
          };
        }
      };
    };
    scope.authenticate();
  }));

});
