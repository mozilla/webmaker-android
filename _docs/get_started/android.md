# Developing on Android

## Install Android SDK

For this project you will need the SDK command line tools. You can download and install from (https://developer.android.com/sdk/index.html)[developer.android.com] or via brew:

```bash
brew install android-platform-tools
```

Depending on where you have installed it, you may need to add the following to your .bash_profile:  (`ANDROID_HOME` should refer to wherever you installed the SDK)

```bash
export ANDROID_HOME=~/Library/Android/sdk
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

Open a new window and type:
```
adb version
```
If you see something like `Android Debug Bridge version 1.0.32`. If you don't, see [this page on MDN](https://developer.mozilla.org/en-US/Firefox_OS/Debugging/Installing_ADB) for more help.


## Install Cordova

`npm install -g cordova`

## Turn on remote debugging on your device

- Enable USB debugging on your phone. ([Check out this guide](http://www.phonearena.com/news/How-to-enable-USB-debugging-on-Android_id53909) if you need help)
- Plug it into your computer via USB and run `adb devices` to make sure your device is recognized

## Set up Webmaker App

- clone [mozilla/webmaker-app](https://github.com/mozilla/webmaker-app)
- run `npm install` and then `gulp dev` to build/watch changes
- to be able to make changes in this app and be able to build a new version in Cordova, **you will also need to run `npm link`** in the root of this directory

## Set up the Cordova Wrapper
- clone `mozilla/webmaker-app-cordova`
- `npm install`
- `npm start`

This should build your project for the first time and attempt to launch the app on your phone (assuming it is plugged in and available through `adb`)

In order to complete the link to your local copy of `mozilla/webmaker-app`, run the following command once in the root of this directory:

```
npm link webmaker
````

After you do that, all you need to do to re-build the app is run the following every time you make a change:

```
npm run android
```

## Debugging with weinre

Unfortunately, Webview in Android 4.2 does not ship with a debugger – we will have to inject a script and hack in our own. To do this, install [weinre](http://people.apache.org/~pmuellr/weinre-docs/latest) via npm:

```
npm install -g weinre
```

In order to make debugging easier, you will also want to tunnel to the local port that `weinre` runs on (the alternative is making sure your local computer and phone are on the same network and looking up your IP address, which is time-consuming and requires constant re-configuration). I use `ngrok` to do this. You can download it from [the ngrok website](`ngrok`).

Now that you have `weinre` and `ngrok` installed, first run

```
weinre --httpPort 1234
```

to start your weinre debugging server. You can use any port you want Then, create a tunnel to like this:

```
ngrok -subdomain=w1nr3 1234
``

Set the `subdomain` option to something short and unique.

After you've done that, `cd` into the `webmaker-app/` directory that you cloned from `mozilla/webmaker-app` and create a file called `.env` in the root directory, if it does not already exist. Add the following environment variable to it:

```
REMOTE_DEBUGGING=http://w1nr3.ngrok.com
```

This should be the match your `ngrok` URL. After that, kill and restart your `gulp dev` process to rebuild with the new environment.

Finally, `cd` back to `webmaker-app-cordova/` and run `npm run android` to rebuild the android app and install on your device or emulator. Once it has been installed, visit `http://w1nr3.ngrok.com/client/#anonymous`. You will now be able to debug your remote device!


## Other tips

### Android WebView Browser

You may also want to download [WebView Developer Browser](https://play.google.com/store/apps/details?id=com.webviewbrowser&hl=en) from the Google Play store so that you can quickly run the web version of webmaker-app. This is the browser Cordova uses on Android 4.2.

### Setting up an emulator profile for 4.2

If you don't have an Android device, you can test on an Android emulator for 4.2. First, run the following to check what targets are available:

```
android list targets
```

You will want to use `android-17`. Choose a name for your profile and run the following to create an avd:

```
android create avd -n myemulator -t android-17
```

Go ahead and use hardware defaults when it prompts you. Now, you can use your emulator when building and running webmaker app with the following commands:

```
cordova prepare
cordova run android --target myemulator
```


