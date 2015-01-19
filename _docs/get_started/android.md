# Developing on Android

## Dependencies
- install adb (android device bridge)
- `npm install -g cordova`

## Setting up your phone
- turn on remote debugging with your phone
- install “Webview Browser” from google play store
- plug it into USB
- check `adb devices` to make sure your device is recognized

## Set up Webmaker App
- clone mozilla/webmaker-app
- npm install
- gulp dev
- npm link
- ngrok 8080
- visit <id>.ngrok.com on Webview Browser on your phone

## Set up Cordova Wrapper
- clone mozilla/webmaker-app-cordova
- npm install
- npm link webmaker
- cordova prepare
- cordova run android (make sure your device is plugged in)

Re-run last two steps every time you need to build a new version.

## TODO:
- setting up an AVD profile for emulator with 4.2
- debugging with weinre
