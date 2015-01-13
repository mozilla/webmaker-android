# Configuration

You should not need to modify any of the default configuration (`config/defaults.env`) to develop locally, but if you would like to, you should create a file called `.env` in your root directory:

```bash
touch .env
```

Take a look at [config/defaults.env](https://github.com/mozilla/webmaker-app/blob/master/config/defaults.env) to see what you can add/change.


## Using config values

If you need a config value in your code, require the `config/index.js`. Note that this file is built by gulp when you run `gulp dev` or `gulp build`.

### Example: Adding config to a file called lib/bunnies.js

```js
// Path to config folder
var config = require('../config');

console.log('Bunnies log in at ' + config.LOGIN_URL);
```

## Adding new configuration

If you need to add a configurable environment variable, you should do the following;

1. Add a default value to `config/defaults.env`
2. List it in the `expose` object in the gulp task (`gulp/config.js`).

**WARNING: Do not commit secret keys or other sensitive information to github. Instead, you will have to ask an ops administrator to add it to the server's environment manually**
