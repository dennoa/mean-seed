'use strict';

var config = require('./config/environment');

function defineApi(app) {
  app.use('/swagger', require('./swagger'));
  app.use('/api/clientConfig', require('./api/clientConfig'));
}

function defineOtherRoutes(app) {
  // All undefined asset or api routes return a 404
  app.route('/:url(api|app|node_modules|assets)/*').get(function(req, res) {
    res.status(404).end();
  });
  // All other routes redirect to the index.html
  app.route('/*').get(function(req, res) {
    res.sendFile(app.get('appPath') + '/index.html', {root: config.root});
  });
}

module.exports = function(app) {
  app.use('/auth', require('./auth'));
  defineApi(app);
  defineOtherRoutes(app);
};
