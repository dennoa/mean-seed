'use strict';

var config = require('../../config/environment/index');
var request = require('request');

function tokenParams(clientParams) {
  return {
    code: clientParams.code,
    client_id: clientParams.clientId,
    client_secret: config.auth.github.clientSecret,
    redirect_uri: clientParams.redirectUri
  };
}

function lookupToken(clientParams) {
  return new Promise(function(resolve, reject) {
    request.get({ url: config.auth.github.tokenEndpoint, qs: tokenParams(clientParams), json: true, proxy: config.proxy }, function(err, res, token) {
      if (err) { return reject(err); }
      if (token.error) { return reject(token); }
      resolve(token);
    });
  });
}

function retrieveUserInfo(token, cb) {
  request.get({ url: config.auth.github.userInfoEndpoint, qs: token, headers: {'User-Agent': 'Node'}, json: true, proxy: config.proxy }, function(err, res, userInfo) {
    if (err) { return cb(err); }
    userInfo.picture = userInfo.avatar_url;
    cb(null, userInfo);
  });
}

function auth(clientParams, cb) {
  lookupToken(clientParams).then(function(token) {
    retrieveUserInfo(token, cb);
  }, cb);
}

module.exports = auth;
