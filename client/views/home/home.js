'use strict';

angular.module('meanSeed').config(function($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home/home.html',
      controller: 'HomeCtrl'
    })
    .state('home.gulp', {
      templateUrl: 'views/home/home.gulp.html'
    })
    .state('home.api', {
      templateUrl: 'views/home/home.api.html'
    })
    .state('home.auth', {
      templateUrl: 'views/home/home.auth.html'
    });
});
