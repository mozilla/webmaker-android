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
- `npm run build`

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

###Installing Firefox OS Simulator

1. On the top right, select `Select Runtime -> Install Simulator` and from the list install "Firefox OS 2.0 Simulator"
2. Press "Close" in the top right to get back to the first screen


### Select Mobile Webmaker Project

1. On the top left select `Open App -> Open Packaged App`
2. Assuming you have `run npm run firefoxos` in the webmaker-app-cordova directory, select `webmaker-app-cordova -> platforms -> firefoxos -> www`
3. The application information should appear on the screen with a green "Valid" in the top right.

*Note:* You **must** select the this folder for the simulator to work.

###Run Mobile Webmaker

1. Select run the Simulator by selecting it from "Select Runtime" on the top right of the window.
2. Press "Install and Run" ![Install and run button](../img/installandrun.png)

###Debugging Tool

The debugging tool can be accessed by pressing the pause button ![Wrench button](../img/wrench.png) while the application is running.

![WebIDE and running app](../img/IDEdebugger.png)

###Learn More

For more information on the WebIDE, [check out this page](https://developer.mozilla.org/en-US/docs/Tools/WebIDE).
