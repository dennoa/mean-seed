'use strict';

angular.module('meanSeed', [
  'ui.router'

]).config(function($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(false);
});
