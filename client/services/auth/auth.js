'use strict';

/**
 * Sets up satellizer for OAuth
 */
angular.module('meanSeed').config(function($authProvider) {
  $authProvider.google({
    clientId: 'GOOGLE_CLIENT_ID'
  });
}).run(function($http, toUrl, SatellizerConfig) {
  //Set the authorization endpoint from the google discovery document rather than hard-coding it. Should be a better way...
  $http.get(toUrl('/auth/google/discoveryDocument')).success(function(doc) {
    SatellizerConfig.providers.google.authorizationEndpoint = doc.authorization_endpoint;
  });
});
