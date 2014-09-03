## Mobile Appmaker

[![Build Status](https://travis-ci.org/mozillafordevelopment/mobile-appmaker.svg)](https://travis-ci.org/mozillafordevelopment/mobile-appmaker)
[![devDependency Status](https://david-dm.org/mozillafordevelopment/mobile-appmaker/dev-status.svg)](https://david-dm.org/mozillafordevelopment/mobile-appmaker#info=devDependencies)

### Background
Mobile Appmaker is a product exploring how to radically lower the entry to creating and distributing mobile applications through on-device authoring.

![](https://cloud.githubusercontent.com/assets/747641/3974620/6f9cced4-27f7-11e4-9738-3d3c5296d37e.png)

### Structure
Mobile Appmaker is structured around a number of lightweight composable `CommonJS` modules that provide abstractions for routing, XHR, IndexedDB, i18n, and MVVM. Bundling for distribution is handled by [browserify](https://github.com/substack/node-browserify). Testing is handled by [mocha](https://github.com/visionmedia/mocha) and [phantomjs](http://phantomjs.org/).

#### Views
Views and components are the basic building blocks of Appmaker. Views are the highest level object and represent a discrete screen such as "Discover" or "App Details". Both are defined via the MVVM abstractions provided by [Vue.js](https://github.com/yyx990803/vue).

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

---

### Getting Started

To get a local version of `mobile-appmaker` running, you'll need a few tools installed on your system first. If you haven't already, you'll want to install [git](http://git-scm.com/), [node](http://nodejs.org/), and [gulp](http://gulpjs.com/). Once you have those items installed:
```bash
git clone git@github.com:mozillafordevelopment/mobile-appmaker.git
cd mobile-appmaker
npm install
```

#### Build & Run
Once you have `mobile-appmaker` installed, you'll want to build it so you can run it within your web browser (or device simulator). To do this, simply type the following:
```bash
gulp build
```

Once the build process is complete, you can run a version locally:
```bash
gulp server
```

#### Testing
If you make changes to `mobile-appmaker`, you can test them by running:
```bash
gulp test
```
