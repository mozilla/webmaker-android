# Analytics

We use Google Analytics to measure and understand aggregate user behaviour and to learn about which features of the app are most frequently used. Over time we can see if the changes we make to the app help more users to make and publish their own content.

However, we only collect data about the user interactions and app and events that we specify within our code.

So, if you are developing a new feature and want to find out if and how it is being used, you will need to add analytics tracking events into your code.

## 1. Include the analytics module

```js
var analytics = require('../../lib/analytics');
```

Adjusting the `../../` relative path depending on where you using this.


## 2. Fire events to record the data you care about

### screenView(obj)

obj fields | required/optional
--- | ---
screenName | Required

Example:
```js
analytics.screenView({screenName: ctx.canonicalPath});
```

### event(obj)

obj fields | required/optional
--- | ---
category | Required
action | Required
label | Optional

Example:
```js
analytics.event({category: 'Blocks', action: 'Add', label: blockId});
```


### error(obj)

obj fields | required/optional
--- | ---
description | Required

Example:
```js
analytics.error({description: 'Firebase Save Error'});
```

## Console output

`analytics` module errors will be output to the console as warnings.

If you wish to enable verbose logging output to see what the analytics module is doing over time and to see when your events are successfully being sent to Google Analytics, change the `ANALYTICS_CONSOLE_LOGGING` in `config/defaults.env` to `true`, and re-run `gulp build`.


## Important

Never include Personally Identifiable Information (PII) in data you send to GA.

e.g. do not log email addresses or usernames as values in these events.

## Examples

See some examples of analytics module in the existing codebase by [searching for analytics.event](https://github.com/mozilla/webmaker-app/search?utf8=%E2%9C%93&q=analytics.event) on our Github Repo.
