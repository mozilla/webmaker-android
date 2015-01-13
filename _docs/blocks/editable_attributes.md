# Editable Attributes Reference

All blocks can have **editable attributes**, each of which store settings that can be changed by an app creator.

## Where do I define editable attributes?

Attributes are defined in the `data.attributes` object found in `<your block folder>/index.js`:

```js
module.exports = {
    className: 'phonecall',
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

## Properties of editable attributes

Each editable attribute is keyed on its `id`, and should include three properties:

* `label`: The label which appears to the app creator in the block editor
* `type`: The type of editor that should be generated in the block editor
* `value`: A default/placeholder value that will be used when the block is first added to the app

### Label

Labels can be any string, but should be specific and descriptive of the function that the attribute plays in your block. You should define labels in **English (US)** and [add a localization](../localization/README.md) for it if you wish to make it available in other languages.

### Type

The default type (if not defined) is `string`, which will generate a simple input field. 

### Special types

Some types have special functionality and custom editors:

* `innerHTML`: The innerHTML of your block container **will automatically be set** to the value of this attribute.
* `color`: The `style.color` of your block container **will automatically be set** to the value of this attribute. You will also get a special color picker for an editor.

Types which are *not* special types will get the `string` editor and have no special automatically functionality; you will have to apply them in your template/js for them to be useful.

