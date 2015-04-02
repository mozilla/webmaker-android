# Developing on Firefox OS

### Install Cordova

`npm install -g cordova`

### Set up Webmaker App

- clone [mozilla/webmaker-app](https://github.com/mozilla/webmaker-app)
- run `npm install` and then `gulp dev` to build/watch changes
- to be able to make changes in this app and be able to build a new version in Cordova, **you will also need to run `npm link`** in the root of this directory

### Set up the Cordova Wrapper
- clone `mozilla/webmaker-app-cordova`
- `npm install`
- `npm start`

This should build your project for the first time.

In order to complete the link to your local copy of `mozilla/webmaker-app`, run the following command once in the root of the webmaker-app-cordova directory:

```
npm link webmaker
```

After you do that, all you need to do to re-build the app for FirefoxOS is run the following every time you make a change:

```
npm run firefoxos
```

## Web IDE Overview

Firefox WebIDE allows you to emulate Firefox OS using your browser and run Firefox OS applications for testing. It also includes a debugging tool. The Firefox WebIDE can be run from any Firefox 36.0+ browser or Firefox Developer Edition.

### Install Firefox Developer Edition

The Firefox Developer Edition can be found here: [https://www.mozilla.org/en-US/firefox/developer/](https://www.mozilla.org/en-US/firefox/developer/).

### Opening WebIDE

In the Web Developer menu, click on the WebIDE entry and the WebIDE opens.

You can also use the keybinding:

*Mac*: Shift-fn-F8.

*Windows*: Shift-F8

![Firefox WebIDE Window](https://mdn.mozillademos.org/files/8033/webide-initial.png)

### Select Mobile Webmaker Project

1. On the top left select `Open App -> Open Packaged App`
2. Assuming you have run `npm run firefoxos` in the webmaker-app-cordova directory, select `webmaker-app-cordova -> platforms -> firefoxos -> www`
3. The application information should appear on the screen with a green "Valid" in the top right.

*Note:* You **must** select the this folder for the simulator to work.

### Running Mobile Webmaker

Open the menu labeled "Select Runtime" to see what your options are.

- If you don't have a Firefox OS device, choose "Install Simulator", and select
"Firefox OS 2.0 Simulator" from the menu. Once it's installed, select it from
the "Select Runtime" menu.

- If you have a Firefox OS device plugged in to USB, and it appears in the list,
choose your device.

- If you have a Firefox OS device plugged into USB, and it does *not* appear in
the list, run `adb forward tcp:6000 localfilesystem:/data/local/debugger-socket`
in the terminal and select "Remote Runtime" in the WebIDE Runtime menu. Confirm
that `localhost:6000` is in the remote runtime modal, and click "OK".

Once you've selected your runtime, press the `▶︎` button to install the app. Make
sure to accept the incoming connection on your device!

### Debugging Tool

The debugging tool can be accessed by pressing the wrench button ![Wrench button](../img/wrench.png) while the application is running.

![WebIDE and running app](../img/IDEdebugger.png)

### Learn More

For more information on the WebIDE, [check out this page](https://developer.mozilla.org/en-US/docs/Tools/WebIDE).
