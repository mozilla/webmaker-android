var fs = require('fs');
var ncp = require('ncp').ncp;

if(fs.existsSync('.env')) {
  ncp('.env', 'node_modules/webmaker-core/.env', function (error) {
    if (error) {
      console.error('Failed to copy .env');
    }
  })
}
