## wookiee

### Structure
Wookiee is structured around a number of lightweight composable `CommonJS` modules that provide abstractions for routing, XHR, IndexedDB, i18n, and MVVM. Bundling for distribution is handled by [browserify](https://github.com/substack/node-browserify). Testing is handled by [mocha](https://github.com/visionmedia/mocha) and [marionette](https://developer.mozilla.org/en-US/docs/Mozilla/QA/Marionette).

#### Views
Views and components are the basic building blocks of wookiee. Views are the highest level object and represent a discrete screen such as "Discover" or "App Details". Both are defined via the MVVM abstractions provided by [Vue.js](https://github.com/yyx990803/vue).

Anatomy of a view:
```
myView
    -> index.js
    -> index.html
    -> index.css
```

```js
require('insert-css')(require('./index.css'));

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

### To Build
```bash
make build
```

### To Test
```bash
make test
```