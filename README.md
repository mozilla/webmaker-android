## Webmaker App

[![Build Status](https://travis-ci.org/mozilla/webmaker-app.svg)](https://travis-ci.org/mozilla/webmaker-app)
[![devDependency Status](https://david-dm.org/mozilla/webmaker-app/dev-status.svg)](https://david-dm.org/mozilla/webmaker-app#info=devDependencies)

This documentation is published at [webmaker-mobile-guide.mofodev.net](http://webmaker-mobile-guide.mofodev.net/_docs/get_started/README.html).

If you need to view the documentation offline or want to contribute to it, see [mozilla/webmaker-app](https://github.com/mozilla/webmaker-app).

## Background
Mozilla Webmaker is all about building a new generation of digital creators and webmakers, giving people the tools and skills they need to move from using the web to actively making the web. To this end, the Webmaker App is an entry point to the Webmaker community that provides a radically simple interface for creating mobile application directly on device. In conjunction with our ongoing device launches for Firefox OS, our goal is to enable users in developing markets such as Bangladesh, India, and Kenya to engage in the creation and sharing of applications that enrich their lives.

![Screenshots](https://cloud.githubusercontent.com/assets/747641/3974620/6f9cced4-27f7-11e4-9738-3d3c5296d37e.png)

## Compatibility

Webmaker aims to be as useful and compatible as possible to a wide variety of users, and you should
[let us know](https://github.com/mozilla/webmaker-app/issues/new) if you find that it
does not work on your device or browser. We make every effort to test in the following baseline environments:

|OS        |Baseline Version/Device|Ideal Version/Device|
|----------|-----------------------|--------------------|
|Firefox&nbsp;OS|1.3 running on the [Tarako](https://wiki.mozilla.org/FirefoxOS/Tarako)|2.1 running on [Flame](https://developer.mozilla.org/en-US/Firefox_OS/Developer_phone_guide/Flame)|
|Android   |4.2 running on the [Huawei Y600](http://www.gsmarena.com/huawei_ascend_y600-6278.php)|4.4 running on the [Nexus 4](http://www.gsmarena.com/lg_nexus_4_e960-5048.php)|
|iOS       |7.x running on iPhone 5/iPod Touch (5 Gen)|8.x running on iPhone 6/iPod Touch (6th Gen)|

#### Technical Overview

Webmaker Mobile is structured around a number of lightweight composable CommonJS modules that provide abstractions for routing, XHR, IndexedDB, i18n, and MVVM. Bundling for distribution is handled by browserify. Testing is handled by mocha and phantomjs.

Views and components are the basic building blocks of Appmaker. Views are the highest level object and represent a discrete screen such as "Discover" or "App Details". Both are defined via the MVVM abstractions provided by Vue.js.


#### Views
Views and components are the basic building blocks of the Webmaker App. Views are the highest level object and represent a discrete screen such as "Discover" or "App Details". Both are defined via the MVVM abstractions provided by [Vue.js](https://github.com/yyx990803/vue).

Anatomy of a view:

```
myView
    -> index.js
    -> index.html
    -> index.less
```

```js
module.exports = {
    id: 'myView',
    components: {
        myComponent: require('../../components/myComponent')
    },
    template: require('./index.html'),
    data: {
        title: "Hello World!"
    }
};
```

```html
<h1>{{title}}</h1>
```

```css
#myView {
    background-color: pink;
}
```

#### Components
Components look just like views in terms of structure (because they are the same!) but are designed to be rendered inside of a view. For this reason, we keep them logically separated in a directory called `components` at the top level of the project. A component is rendered by a view via the `v-component` directive.

```html
<div v-component="myComponent"></div>
```

#### Static Assets
Static assets (such as images, icons, and the webapp manifest) are contained within a directory called `static` at the top level of the project. During the build process all static assets are copied to the `build` directory and added to the `appcache` manifest. Because of this, assets placed in the `static` directory should not be `require`-d in views or components as they will already be inlined via the bundler (browserify).
