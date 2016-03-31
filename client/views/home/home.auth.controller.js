'use strict';

angular.module('meanSeed').controller('HomeAuthCtrl', function($scope, $auth) {
  
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider).then(function(response) {
      $scope.userInfo = $auth.getPayload();
    }).catch(function(error) {
      console.log(error);
    });
  };
  
  $scope.isAuthenticated = $auth.isAuthenticated;

});
