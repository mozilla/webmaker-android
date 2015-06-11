var habitat = require('habitat');
var environment = habitat.get('NODE_ENV');

// Local environment in .env overwrites everything else
habitat.load('.env');

if (environment === 'PRODUCTION') {
  console.log('loading production config');
  habitat.load('config/production.env');
}

habitat.load('config/defaults.env');

var config = {
  CLIENT_ID: habitat.get('CLIENT_ID')
};

process.stdout.write(
  '// THIS IS A GENERATED FILE. EDIT npm_tasks/build-config.js INSTEAD\n' +
  'module.exports = ' + JSON.stringify(config) + ';\n'
);
