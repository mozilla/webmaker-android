# Get started

### Dependencies

To get a local version of Webmaker Mobile running, you'll need to have [git](http://git-scm.com/) and [node](http://nodejs.org/) installed on your local machine.

You'll also need to **globally install [gulp](http://gulpjs.com/)**, which we use for building front-end assets:

```bash
npm install -g gulp
```

*Note: If you get errors globally installing gulp, try `sudo npm install -g gulp`.*

### Clone

In order to contribute to Webmaker Mobile, you'll need to **create your own fork** of Webmaker Mobile and make pull-requests against our master branch.

Clone from your own fork or from the original:

```
git clone https://github.com/mozilla/webmaker-app.git
cd webmaker-app
```

### Build and develop

To start developing, all you need to do is run the following in the `webmaker-app` directory you just created:

```bash
npm install
npm install -g browserify
npm install -g watchify
gulp build
gulp dev
```

This will pull down localization files, build the project, start a webserver for you at `http://localhost:8080`, and run a `watch` process so that your front-end assets will be regenerated as you make changes.

### Trouble connecting?

By default, you will need to log in to test the app. If you're having trouble logging in or you see connection errors in the console, [File an issue](https://github.com/mozilla/webmaker-app/issues) and switch to **offline mode** instead.

To start the app in offline mode create a `.env` file in the root of the `webmaker-app` directory:

```
touch .env
```

Then, add the following line to that file and restart with `gulp dev`

```
OFFLINE_MODE=true
```

You can also start the app in offline temporarily by appending `?offline=true` to the URL in your browser.

To read more about configuration see [Configuration](config.md)


