'use strict';

var jwt = require('./jwt');

/**
 * All OAuth providers perform the required steps to verify the user and retrieve their basic information
 * @param providerHandler The handler for a particular OAuth provider such as google, facebook, linkedin, etc...
 */
module.exports = function(providerHandler) {
  return function(req, res) {
    providerHandler(req.body, function(err, userInfo) {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json({
        token: jwt.encode(userInfo)
      });
    });
  };
};
