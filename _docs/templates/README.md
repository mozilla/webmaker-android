# Templates

### How are templates stored internally?

In Webmaker Mobile, individual app templates are represented by a JSON blob in `lib/templates.json` that looks something like this:

```js
{
    id: '000d1745-5d3c-4997-ac0c-15df68bbbecz',
    name: 'Portal App',
    icon: '/images/placeholder_puppy.png',
    author: {
        username: 'Chell',
        location: 'Aperture Labs',
        avatar: 'https://aslabs.com/a/chell.png'
    },
    blocks: [
        {
            id: 'highlight',
            attributes: {
                innerHTML: {
                    label: 'Text',
                    type: 'string',
                    value: 'Which color?'
                }
            }
        },
        {
            id: 'portal',
            attributes: {
                color: {
                    label: 'Color',
                    type: 'color',
                    value: 'blue'
                }
            }
        }
    ]
}
```

The App can have a unique title, author, and list of **blocks**. Each [block](../blocks/README.md) is a functional piece in the app that can have editable properties.

When a user creates a new app, it is copied from the template JSON. The user object is replaced, and the app is renamed 'Untitled App'.

As a developer, you can also create **new blocks for users to choose from** when they build apps.


