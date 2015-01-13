# Components

If you're thinking about doing bugs to change the editor UI and functionality, you're going to want to create (or update) a **component**.

In Webmaker Mobile, components are individual units of code, including html, js, and possibly css, that add functionality to a element (or tree elements) in the DOM.

## Where can I find existing components?

Each folder in the [`components/`](https://github.com/mozilla/webmaker-app/tree/master/components/)directory represents a component.

For example, the [`tabBar` component](https://github.com/mozilla/webmaker-app/tree/master/components/tabBar) creates a bar at the bottom of the app with navigation buttons.

![tabBar visual example](https://k88hudson-screenshots.s3.amazonaws.com/screen-shots/k88mac@2x_2014-10-08_at_4.36.06_PM.png)

## Using a component

Using a component in a view is as simple as including the `v-component` attribute. If you need to include data with it, you can pass along that data in the `v-with` attribute.

### Example - using the navigationBar component

Let's say we want to add our navigationBar component to a new view. Since this component is already registered in `lib/view.js`, all we need to do is add it to our view's html:

```html
<div v-component="navigationBar"></div>
```

Now, if we want to set the `title` on the navigation bar, we need to pass that in with `v-with`:

```html
<div v-component="navigationBar" v-with="title: 'Hello World'"></div>
```

## Creating a new component

Let's make a new component called `selector`. It creates a select element given a list of choices.

### Create the component directory

First, we need to add the necessary files to [`components/`](https://github.com/mozilla/webmaker-app/tree/master/components/):

```
components/
    selector/
        index.html
        index.js
```

In this case, we don't need any css for this component, so we won't be including it.

### Add some html

Let's create our html structure.

```html
<select>
    <option v-on="change: onChange" value="{{choice.value}}" v-repeat="choices">{{ choice.label }}</option>
</select>
```

This uses a few `vue.js` directives:

* `v-on`: We're using `v-on` to set a custom event listener, which someone can add to the component by passing in `v-with: "onChange: function () { whatever blah blah blah }"`
* `v-repeat`: This allows our `select` element to create an `option` per choice in our choice array.

*TODO: More about the js file. For now, just take a look at other components in the folder.*

### Registering the component

Components have to be **registered** with vue.js in order to be available in the app.

You can do this in [`lib/view.js`](https://github.com/mozilla/webmaker-app/tree/master/lib/view.js):

```js
var componentList = {
    ...
    selector: require('../components/selector')
    ...
};
```

### Using your new component

Now you can use your component! Make sure you include `choices` and `onChange` in the data model:

views/some-view/index.js
```js
    ...
    data: {
        selectorData: {
            choices: [
                {
                    label: 'Apples',
                    value: 'apples'
                },
                {
                    label: 'Oranges',
                    value: 'oranges'
                },
                {
                    label: 'Bananas',
                    value: 'bananas'
                },
            ]
        },
        onChange: function () {
            console.log(this.value);
        }
    }
    ...
```

views/some-view/index.html
```html
    <label>What is your favourite fruit?</label>
    <div v-component="selector" v-with="selectorData"></div>
```
