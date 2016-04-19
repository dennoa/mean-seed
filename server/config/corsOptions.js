'use strict';

var config = require('./environment');

function getHostname(origin) {
  if (origin) {
    var start = origin.indexOf('://');
    if (start > 0) {
      start += 3;
      var end = origin.indexOf(':', start);
      if (end < 0) { end = origin.indexOf('/', start); }
      if (end < 0) { end = origin.length; }
      return origin.substring(start, end);
    }
  }
  return '';
}

function isSupported(origin) {
  //supportedHostnames is a regex identifying the supported domains for cross-origin resource sharing requests. It matches against the origin host name
  var supportedHostnames = config.cors.supportedHostnames;
  return !!supportedHostnames && !!getHostname(origin).match(supportedHostnames);
}

module.exports = {
  origin: function(origin, cb) {
    cb(null, isSupported(origin));
  }
};
