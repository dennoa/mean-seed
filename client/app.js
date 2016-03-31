'use strict';

angular.module('meanSeed', [
  'satellizer',
  'ui.router'

]).config(function($urlRouterProvider, $locationProvider, $authProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(false);
});
