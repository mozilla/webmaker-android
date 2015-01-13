# Localization

## Viewing localized version of Webmaker Mobile

Assuming you've build everything and run the server with `gulp dev`, you should be able to see the app in any localization by visiting: [http://localhost:8080?locale=fr](http://localhost:8080?locale=fr), replacing `fr` which whatever locale code you want to look at (e.g. `en-US`, `bn-BD`, `nl`...)

You can also try this on our live staging site at [https://mobile-appmaker.mofostaging.net?locale=fr](https://mobile-appmaker.mofostaging.net?locale=fr).

## How localization works

All strings are stored in json files in the [https://github.com/mozilla/webmaker-app/tree/master/locale/](locale/) directory. Only the strings for `en-US` are checked into Github – these function as our source files. The rest are pulled down during the build process from Transifex, a continuous translation platform.

[The json files](https://github.com/mozilla/webmaker-app/tree/master/locale/en_US/mobile-appmaker.json) follow the `chrome.i18n` format, which looks like this:

```js
{
    "hi username": {
        "message": "Hi {{username}}!",
        "description": "A greeting for the user"
    }
}
```

Each string is keyed on a `keyname`, which in this example is "hi username". The message is the full text (and any HTML or templating) that gets rendered in the page.

The description is only shown to translators, to give them more information about the context of the string.

## How to localize views in Webmaker Mobile

Any time you render html in Webmaker Mobile, you will have access to the `i18n` filter.

Here's an example html file that might be included in a view:
```html
<p>Blah blah blah blah</p>
<button>Submit</button>
```

To localize it, first we convert all the strings to key-names and apply the `i18n` filter:
```html
<p>{{'Blah blah blah blah' | i18n}}</p>
<button>{{'Submit' | i18n}}</button>
```

Then, we add the strings to [locale/en_US/mobile-appmaker.json](https://github.com/mozilla/webmaker-app/blob/master/locale/en_US/mobile-appmaker.json):
```js
{
    "Blah blah blah blah": {
        "message": "Blah blah blah blah",
        "description": "Saying blah to the user"
    },
    "Submit": {
        "message": "Submit",
        "description": "Button for submitting blah blah"
    }
}
```
