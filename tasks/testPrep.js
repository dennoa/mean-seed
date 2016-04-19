'use strict';

/**
 * Test Preparation tasks
 */

var gulp = require('gulp');
var istanbul = require('gulp-istanbul');


module.exports = function() {
  return gulp.src(['server/**/*.js', '!server/**/*.spec.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
};
