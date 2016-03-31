'use strict';

var config = require('../../config/environment/index');
var defaultDiscoveryDocument = require('./defaultDiscoveryDocument');
var request = require('request');
var jwt = require('jwt-simple');

var discoveryDocPromise = new Promise(function(resolve, reject) {
  request.get({ url: config.auth.google.discoveryDocumentUrl, json: true }, function(err, res, currentDiscoveryDocument) {
    resolve(err ? defaultDiscoveryDocument : currentDiscoveryDocument);
  });
});

function auth(req, res) {
  function handleErr(err) {
    res.status(500).send(err);
  }
  lookupToken(req.body).then(function(token) {
    retrieveUserInfo(token).then(function(userInfo) {
      res.status(200).json({
        token: createJWT(userInfo)
      });
    }, handleErr);
  }, handleErr);
}

function lookupToken(clientParams) {
  return new Promise(function(resolve, reject) {
    var params = {
      code: clientParams.code,
      client_id: clientParams.clientId,
      client_secret: config.auth.google.clientSecret,
      redirect_uri: clientParams.redirectUri,
      grant_type: 'authorization_code'
    };
    discoveryDocPromise.then(function(doc) {
      request.post({ url: doc.token_endpoint, form: params, json: true }, function(err, res, tokenDoc) {
        if (err) { return reject(err); }
        if (tokenDoc.error) { return reject(tokenDoc); }
        resolve(tokenDoc.access_token);
      });
    });
  });
}

function retrieveUserInfo(token) {
  return new Promise(function(resolve, reject) {
    discoveryDocPromise.then(function(doc) {
      request.get({ url: doc.userinfo_endpoint, headers: {Authorization: 'Bearer ' + token}, json: true }, function(err, res, userInfo) {
        if (err) { return reject(err); }
        if (userInfo.error) { return reject(userInfo); }
        resolve(userInfo);
      });
    });
  });
}

function createJWT(userInfo) {
  return jwt.encode(userInfo, config.auth.jwt.secret);
}

function discoveryDocument(req, res) {
  discoveryDocPromise.then(function(doc) {
    res.status(200).json(doc);
  });
}

module.exports = {
  auth: auth,
  discoveryDocument: discoveryDocument
};
