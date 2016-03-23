'use strict';

angular.module('meanSeed').controller('HeaderCtrl', function($scope, clientConfig) {

  clientConfig.then(function(config) {
    $scope.env = config.env;
  });

});
