'use strict';

/**
 * Serve app. For dev purpose.
 */

var gulp = require('gulp');
var ripe = require('ripe');
var nodemon = require('gulp-nodemon');
var open = require('gulp-open');
var livereload = require('gulp-livereload');

var config = require('../server/config/environment');

var openOpts = {
  uri: 'http://localhost:' + config.port,
  already: false
};

module.exports = {

  nodemon: function() {
    return nodemon({
      script: 'server/server.js',
      ext: 'js',
      ignore: ['client', 'dist', 'docker', 'node_modules', 'tasks', 'gulpfile.js', 'karma.conf.js']

    }).on('start', function() {
      if (!openOpts.already) {
        openOpts.already = true;
        ripe.wait(function() {
          gulp.src('client/index.html')
            .pipe(open(openOpts));
        });
      } else {
        ripe.wait(function() {
          livereload.changed('/');
        });
      }
    });
  }

};
