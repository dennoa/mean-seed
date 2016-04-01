'use strict';

/**
 * Sets up satellizer for OAuth
 */
angular.module('meanSeed').config(function($authProvider) {
  $authProvider.google({
    clientId: '294864420775-osujn3pv2omd0k0ed724vkbpe4c99sml.apps.googleusercontent.com'
  });
}).run(function($http, toUrl, SatellizerConfig) {
  //Set the authorization endpoint from the google discovery document rather than hard-coding it. Should be a better way...
  $http.get(toUrl('/auth/google/discoveryDocument')).success(function(doc) {
    SatellizerConfig.providers.google.authorizationEndpoint = doc.authorization_endpoint;
  });
});
