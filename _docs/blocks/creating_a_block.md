# Creating a Block

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

## index.js

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

## index.html

Let's create a template for our `phonecall` block:

```html
<button v-click="callMe">{{ attributes.label.value }}</button>
```

Everything in the `data` object on our `phonecall` constructor is available to the template. We can easily add the `label` attribute as text inside our button. We also added a `callMe` callback to an event-listener using the vue.js `v-click` directive. You can look at a list of all built-in directives [here](http://vuejs.org/api/directives.html).

## index.less

```css
.phonecall {
    background-color: pink;
    border: 1px solid red;
}
```

You can target your block using whatever class name your specified in the `className` property on your constructor (in `index.js`). Since your less will be globally required, you will have access to all colours, variables, and mixins declared in `static/styles/`. See the [less docs](http://lesscss.org/) for more information.

## Tips

### How to detect editing mode

If you'd like to disable or enable a part of your code (for example, a click listener) during editing mode, you can check `this.isEditing` inside the `created` or `ready` function. For example, in index.js:

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
    }
},
created: function () {
    var self = this;

    self.$el.addEventListener('click', function (e) {
        // Return early if this is editing mode
        if (self.isEditing) return;
        window.location = 'tel:' + self.$data.attributes.number.value;
    }, false);
}
...

```
