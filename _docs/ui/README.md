# User Interface

If you're interested in hacking on Webmaker Mobile's user interface, there are a lot of tools at your disposal. Make sure you read over the [Getting Started](../get_started/README.md) section first before diving into the specifics of our UI system.

## Less

This project uses [Less](http://lesscss.org/features), a CSS preprocessor, to generate our CSS. Most of the syntax is very similar; the main differences to keep in mind are the use of [variables and mixins](http://lesscss.org/features/#features-overview-feature-variables), and that the output (common.css) must be *built* from source.

## Which Less/CSS files should I edit?

**You should never edit *any* files in the `build/styles/` directory**. Instead, you must edit the source Less files which are found in four places:

* CSS shared by the whole project is found in `static/styles`. Most files in that directory are `@import`ed by `static/styles/common.less`.
* CSS for each view in `views/`
* CSS for each component in `components/`
* CSS for each block in `blocks/`
