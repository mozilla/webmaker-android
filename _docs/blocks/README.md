# Blocks

## What are blocks?

Webmaker Mobile apps are made of **blocks**, which are self-contained functional units inside an app. They have some default properties and functionality, as well as **editable attributes** like color and text.

Blocks might be very simple things like a textbox or an image, or they might be more complex, like a feed of photos or a hashtag search on twitter.

## What are they for?

Users can add multiple instances of any block type installed in Webmaker Mobile to an app they have created. For example, if I create an empty app called *Toronto Tour* , I might add a **text** block for a headline, a **map** block, another *text* block for a description. Once a block is added to the app, users can edit properties of it by tapping on the block and editing any of the **editable attributes**.

## What defines the properties of a block?

Each block type (image, text, etc.) has a definition which extends the generic block class. It contains some information like className, which will be added to the element containing the block instance, a link to an html template, and an icon and name to display in the block picker.

More importantly, the block definition contains some information about which editable attributes can be modified by users. It also specifies some "dummy" data that will be filled when a user adds a new instance of that block to an app.

This is an example of the data definition for the image block. It only has a single editable attribute, "Source", that stores the source of the image:

```js
{
    className: 'image',
    template: require('./index.html'),
    data: {
        name: 'Image',
        icon: '/images/blocks_image.png',
        attributes: {
            src: {
                label: 'Source',
                type: 'string',
                value: '/images/placeholder.png'
            }
        }
    }
}
```

## What defines the style and layout of a block?

All blocks have an html template and css (Less) file which are used to generate block instances. They can extend global styles provided by Webmaker Mobile or be completely custom.
