'use strict';

/**
 * Sets up satellizer for OAuth
 */
angular.module('meanSeed').config(function($authProvider) {

  function stateToAvoidCsrf() {
    var rand = Math.random().toString(36).substr(2);
    return encodeURIComponent(rand);
  }

  $authProvider.google({
    clientId: 'GOOGLE_CLIENT_ID',
    optionalUrlParams: ['display', 'state'],
    state: stateToAvoidCsrf
  });
  $authProvider.github({
    clientId: 'GITHUB_CLIENT_ID',
    optionalUrlParams: ['scope', 'state'],
    state: stateToAvoidCsrf
  });
  $authProvider.linkedin({
    clientId: 'LINKEDIN_CLIENT_ID',
    state: stateToAvoidCsrf
  });

}).run(function($http, toUrl, SatellizerConfig) {
  //Set the authorization endpoint from the google discovery document rather than hard-coding it. Should be a better way...
  $http.get(toUrl('/auth/google/discoveryDocument')).success(function(doc) {
    SatellizerConfig.providers.google.authorizationEndpoint = doc.authorization_endpoint;
  });
});
