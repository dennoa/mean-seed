/**
 * Files injected into index.html and app.scss
 */

module.exports = {
  nodeModulesJs: [
    'node_modules/angular/angular.js',
    'node_modules/angular-ui-router/release/angular-ui-router.js',
    'node_modules/satellizer/satellizer.js'
  ],
  clientJs: [
    'client/app.js',
    'client/directives/**/*.js', '!client/directives/**/*.spec.js',
    'client/filters/**/*.js', '!client/filters/**/*.spec.js',
    'client/services/**/*.js', '!client/services/**/*.spec.js',
    'client/views/**/*.js', '!client/views/**/*.spec.js', '!client/views/**/*.e2e.js'
  ],
  clientScss: [
    'views/**/*.scss', 'directives/**/*.scss'
  ]
};

