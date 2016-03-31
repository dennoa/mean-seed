'use strict';

angular.module('meanSeed').controller('HeaderCtrl', function($scope, clientConfig, $auth, $window) {

  clientConfig.then(function(config) {
    $scope.env = config.env;
  });

});
