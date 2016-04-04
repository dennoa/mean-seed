'use strict';

var config = require('../../config/environment/index');
var discoveryDocument = require('./discoveryDocument');
var request = require('request');

function tokenParams(clientParams) {
  return {
    code: clientParams.code,
    client_id: clientParams.clientId,
    client_secret: config.auth.google.clientSecret,
    redirect_uri: clientParams.redirectUri,
    grant_type: 'authorization_code'
  };
}

function lookupToken(clientParams) {
  return new Promise(function(resolve, reject) {
    discoveryDocument.get().then(function(doc) {
      request.post({ url: doc.token_endpoint, form: tokenParams(clientParams), json: true, proxy: config.proxy }, function(err, res, token) {
        if (err) { return reject(err); }
        if (token.error) { return reject(token); }
        resolve(token);
      });
    });
  });
}

function toStandardUserInfo(userInfo) {
  return {
    email: userInfo.email,
    name: userInfo.name,
    picture: userInfo.picture
  };
}

function retrieveUserInfo(token, cb) {
  discoveryDocument.get().then(function(doc) {
    request.get({ url: doc.userinfo_endpoint, headers: {Authorization: 'Bearer ' + token.access_token}, json: true, proxy: config.proxy }, function(err, res, userInfo) {
      if (err) { return cb(err); }
      if (userInfo.error) { return cb(userInfo); }
      cb(null, toStandardUserInfo(userInfo));
    });
  });
}

function auth(clientParams, cb) {
  lookupToken(clientParams).then(function(token) {
    retrieveUserInfo(token, cb);
  }, cb);
}

function getDiscoveryDocument(req, res) {
  discoveryDocument.get().then(function(doc) {
    res.status(200).json(doc);
  });
}

module.exports = {
  auth: auth,
  discoveryDocument: getDiscoveryDocument
};
