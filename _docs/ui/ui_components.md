# UI Components

## Alerts

![alerts](https://k88hudson-screenshots.s3.amazonaws.com/screen-shots/k88mac@2x_2014-12-03_at_10.27.52_AM.png
)

#### Usage

```html
<div v-component="alert" type="error" message="someMessage"></div>
```

#### Attributes

* `type`: Can be `error` or `success`. Defaults to `error`.
* `message`: Message to display. Note this will be run through the `i18n` (i.e. translation) filter as a key. Defaults to `errorDefault`.

## makeBar

#### Usage

![makeBar example](https://k88hudson-screenshots.s3.amazonaws.com/screen-shots/k88mac@2x_2014-12-03_at_10.38.52_AM.png)

```html
<div v-component="makeBar" v-with="uiMode: 'edit', onChange: changeMode"></div>
```

#### Data
* `uiMode`: should be `edit`, `play`, or `data`. Sets the position of the slider
* `onChange`: function that runs when a `uiMode` change is initiated

## tabBar

![tabBar](https://k88hudson-screenshots.s3.amazonaws.com/screen-shots/k88mac@2x_2014-12-03_at_10.59.44_AM.png)

```html
<div v-component="tabBar"></div>
```

## navBar

![navBar](https://k88hudson-screenshots.s3.amazonaws.com/screen-shots/k88mac@2x_2014-12-03_at_10.40.40_AM.png)

#### Usage

```html
<div v-component="navigationBar"></div>
```

#### Data
* `back`: `true` or string: if true, creates a back button. if string, creates a back button link where `href` is that string
* `cancel`: `true` or string: same as `back`, but creates a 'Cancel' button instead
* `onDone`: function or string. runs that function or links to that string
* `onDoneLabel`: label for onDone button. defaults to 'Done'

## appCell

![appCell](https://k88hudson-screenshots.s3.amazonaws.com/screen-shots/k88mac@2x_2014-12-03_at_11.02.09_AM.png)

#### Usage

```html
<ul class="list-cell">
    <li v-component="appCell" v-repeat="apps"></li>
</ul>
```

## Switch

![switch](https://k88hudson-screenshots.s3.amazonaws.com/screen-shots/k88mac@2x_2014-12-03_at_10.53.03_AM.png)

#### Usage
Sets a given value to `true` or `false`

```html
<div v-component="switch" v-with="value : sortOldest, options : options"></div>
```

#### Data
* `value`: the value that should be set to `true`/`false` from user interactions
* `options`:
    * `On`: text value for initial `true` option
    * `Off`: text value for initial `false` option
    
## Input error messages

This is not really a component so much as a set of styles. See `static/styles/forms.less`.

#### Usage

You should put a `div` with the class `form-error` directly following an input. For a checkbox input, it should directly follow the `label`.

```html
<input type="text">
<div class="form-error">This is my error!</div>

<div class="checkbox">
    <label>
        <input type="checkbox">
    </label>
    <div class="form-error">This is my error!</div>
</div>
```
