'use strict';

angular.module('meanSeed').controller('HomeCtrl', function($scope, $state) {

  $scope.tabs = [
    { state: 'home.gulp', title: 'gulp'},
    { state: 'home.api', title: 'api'}
  ];

  $scope.isActive = function(tab) {
    return $state.current.name === tab.state;
  };

  $state.go('home.gulp');
});
