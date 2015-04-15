# Developing on Android

* [Install Android Debug Bridge](#install-android-debug-bridge-adb)
    * The first step of getting setup for Android development is installing the Android Debug Bridge tools
* [Install Android SDK](#install-android-19-44-sdk-platform)
    * The second piece of software we'll need for Android development is the Android SDK, which will allow you to run your app
* [USB Debugging](#turn-on-remote-usb-debugging-on-your-device)
    * USB debugging allows us to setup your phone to be used as a test device for your app
* [Chrome Remote Debugging](#chrome-remote-debugging)
    * This will help you start debugging our app using the Chrome developer tools
* [Logcat Remote Debugging](#remote-debugging-via-logcat-works-on-42)
    * How to debug our app using the logcat command line tool
* [Setup Android Cordova](#set-up-android-cordova)
    * To start working on the Webmaker App we need to setup a local version of the Android Cordova Wrapper repository
* [Setup Webmaker App](#set-up-webmaker-app)
    * All the steps needed to get a local version of the Webmaker App repository running locally on our computer
* [Additional Android Development Tips](#other-tips)
    * A few extra tips that should help you up and developing your Android app


## Install Android Debug Bridge (ADB)

<iframe width="775" height="436" src="https://www.youtube.com/embed/-d28E21PuRc" frameborder="0" allowfullscreen></iframe>

For this project we will need the SDK command line tools. We can download and install from [developer.android.com](https://developer.android.com/sdk/index.html) or via brew:

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
If you see something like `Android Debug Bridge version 1.0.32` you have adb installed properly. If you don't, see [this page on MDN](https://developer.mozilla.org/en-US/Firefox_OS/Debugging/Installing_ADB) for more help.

## Install Android 19 (4.4) SDK platform

<iframe width="775" height="436" src="https://www.youtube.com/embed/10XXnYteAqA" frameborder="0" allowfullscreen></iframe>

To run our app we'll need to download Android 19. To do this we'll download the SDK manager from [developer.android.com](https://developer.android.com/sdk/index.html).

We'll also need to make sure Java and Java Development Kit are installed in order to run the `Android` command.


## Turn on remote USB debugging on your device

<iframe width="775" height="436" src="https://www.youtube.com/embed/idRdI2iN2Ek" frameborder="0" allowfullscreen></iframe>

* In order to get started testing apps on a phone, we need to first enable developer mode by tapping the Build number 7 times in `Settings > About`

* Once enabled on our phone, we can then allow USB Debugging in settings

* This will allow us to plug our phone into our computer via USB and run `adb devices` to make sure your device is recognized

* [This guide](http://www.phonearena.com/news/How-to-enable-USB-debugging-on-Android_id53909) has additional information on setting up your phone for USB Debugging


## Set up Webmaker App

We'll first need to install Cordova globally, which will allow us build our mobile application.

`npm install -g cordova`

* We can now clone the Webmaker App repo [mozilla/webmaker-app](https://github.com/mozilla/webmaker-app)

* Once we have a local copy of the `webmaker-app` run `npm install` and then `gulp dev` to build/watch changes

* To be able to make changes in this app and be able to build a new version in Cordova, **we will also need to run `npm link`** in the root of this directory


## Chrome Remote Debugging 

### Remote debugging via Chrome dev tools (4.4 KitKat only)

<iframe width="775" height="436" src="https://www.youtube.com/embed/JM1y3hyUU1Q" frameborder="0" allowfullscreen></iframe>

One of the best ways to debug the Webmaker app is through Chrome's developer tools.

* This will give us the same tools we use for web development for debugging our app

* If Google Chrome is a bit sluggish for debugging, try out Chrome Canary, as it usually performs faster



## Remote debugging via logcat (works on 4.2+)

<iframe width="775" height="436" src="https://www.youtube.com/embed/FfgT4XtLuq4" frameborder="0" allowfullscreen></iframe>

The alternative to using Chrome's developer tools for debugging an app, is to use the `adb logcat` command.

The logcat command is the only method for remote debugging on Android 4.2 (17 Jellybean) phones.



## Set up Android Cordova

* clone `mozilla/webmaker-app-cordova`
* `npm install`
* `npm start`

This should build our project for the first time and attempt to launch the app on the phone (assuming it is plugged in and available through `adb`)

In order to complete the link to our local copy of `mozilla/webmaker-app`, run the following command once in the root of this directory:

```
npm link webmaker
```

After we do that, all we need to do to re-build the app is run the following every time you make a change:

```
npm run android
```

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

