# Get started

### Dependencies

To get a local version of Webmaker App running, you'll need to have [git](http://git-scm.com/) and [node](http://nodejs.org/) installed on your local machine.

You also need at least npm 2.0.0. To update, run

```
npm install -g npm@latest
```

### Clone

In order to contribute to Webmaker App, you'll need to **create your own fork** of Webmaker Mobile and make pull-requests against our master branch.

Clone from your own fork or from the original:

```
git clone https://github.com/mozilla/webmaker-app.git
cd webmaker-app
```

### Build and develop

To start developing, all you need to do is run the following in the `webmaker-app` directory you just created:

```bash
npm install
npm start
```

This will build the project, start a webserver for you at `http://localhost:4242`, and run a `watch` process so that your front-end assets will be regenerated as you make changes.

### Develop on Android

Once you are up and running, you should [set up your Android environment](./android.md).

