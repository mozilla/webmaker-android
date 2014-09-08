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

This will also build the project and pull down localization files for you.

#### Build & Run
Once you have `mobile-appmaker` installed, you'll want to run the server and watch process so your files will be re-built when you make changes:
```bash
gulp dev
```

Visit http://localhost:8080 in your browser.


#### Testing
If you make changes to `mobile-appmaker`, you can test them by running:
```bash
gulp test
```

### Localizing
If you want to pull down localizations from Transifex, our translation service,you should run:

```bash
gulp build
```

You can look at any localization by visiting http://localhost:8080?locale={country code} in your browser. For example, for French, you would visit http://localhost:8080?locale=fr.

You should only add new strings to `locale/en_US/mobile-webmaker.json`. To update any other language, go to the [Transifex project](transifex.com/projects/p/webmaker/resource/mobile-appmaker).

---

### Creating a block

In order to add a block, you will need to add a folder to the `blocks` directory.

Let's say we want to make a `phonecall` block:

```
blocks/
    phonecall/
        index.html
        index.js
        index.less
```

Your folder should given a name that will be the `id` of your block. It will contain three files, `index.js` (the block constructor),  `index.html` (the template), and `index.less` (styles).

#### index.js

Blocks are [vue.js components](http://vuejs.org/guide/composition.html), created by creating a subclass of the generic `block` component (`lib/block.js`).

To start, this is the bare minimum required for your block to be registered:

```js
module.exports = {
    // Added to element containing the block
    className: 'phonecall',
    // Require the template in this file
    template: require('./index.html'),
    data: {
        name: 'Phone Call',
        icon: '/images/blocks_phone.png',
        attributes: {
            number: {
                label: 'Phone #',
                type: 'string',
                value: '+18005555555'
            },
            innerHTML: {
                label: 'Label',
                type: 'string',
                value: 'Send SMS'
            }
        }
    }
};
```

You must include a `name` and `icon` in the `data` object so that your block can be displayed in the "Add a block" menu. You should also include the editable attributes of the block in an object keyed on `id`.

The `color` and `innerHTML` attributes will be automatically applied by the default functionality of all blocks (see `lib/block.js`). Other attributes can be used directly in the template.

Everything in the data object is available to the template, so you can also add event listeners or additional data. For example, let's add a `callMe` function that will get called when a user taps on our `phonecall` block:

```js
    ...
    data: {
        name: 'Phone Call',
        icon: '/images/blocks_phone.png',
        attributes: {
           number: {
                label: 'Phone #',
                type: 'string',
                value: '+18005555555'
            },
            label: {
                label: 'Label',
                type: 'string',
                value: 'Send SMS'
            }
        },
        callMe: function (e) {
            if (!window.MozActivity) return;
            e.preventDefault();
            new MozActivity({
                name: 'new',
                data: {
                    type: 'webtelephony/number',
                    number: self.$data.attributes[number]
                }
            });
        }
    }
    ...
});
```

#### index.html

Let's create a template for our `phonecall` block:

```html
<button v-click="callMe">{{ attributes.label.value }}</button>
```

Everything in the `data` object on our `phonecall` constructor is available to the template. We can easily add the `label` attribute as text inside our button. We also added a `callMe` callback to an event-listener using the vue.js `v-click` directive. You can look at a list of all built-in directives [here](http://vuejs.org/api/directives.html).

### index.less

```css
.phonecall {
    background-color: pink;
    border: 1px solid red;
}
```

You can target your block using whatever class name your specified in the `className` property on your constructor (in `index.js`). Since your less will be globally required, you will have access to all colours, variables, and mixins declared in `static/styles/`. See the [less docs](http://lesscss.org/) for more information.
