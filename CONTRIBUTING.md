# Contribution Guidelines

## Reporting issues

- **Search for existing issues.** Please check to see if someone else has reported the same issue.
- **Share as much information as possible.** Include operating system and version, browser and version. Also, include steps to reproduce the bug. [This](http://github.com/mozilla/webmaker-app/ISSUE_BOILERPLATE.md) is a good boilerplate to use.

## Project Setup

Refer to the [documentation](http://webmaker-mobile-guide.mofodev.net/_docs/get_started/README.html).

## Code Style

### JavaScript

JS files must pass JSCS and JSHint using the provided [.jshintrc](http://github.com/mozilla/webmaker-app/.jshintrc) and [.jscsrc](http://github.com/mozilla/webmaker-app/.jscsrc) rules.

Run `gulp lint` before pushing a commit. It will validate that your JS passes our formatting rules.

#### Variable Naming

- `lowerCamelCase` General variables
- `UpperCamelCase` Constructor functions
- Use semantic and descriptive variables names (e.g. `colors` *not* `clrs` or `c`). Avoid abbreviations except in cases of industry wide usage (e.g. `AJAX` and `JSON`).

### HTML

- 4 space indentation
- Class names use hypenated case (e.g. `my-class-name`)

### LESS / CSS

- 4 space indentation
- Always a space after a property's colon (e.g. `display: block;` *not* `display:block;`)
- End all lines with a semi-colon
- For multiple, comma-separated selectors, place each selector on it's own line

### Editor Config

*Note:* There is an `.editorconfig` that will help you maintain settings consistent with our guidelines. Most editors support this format. See [editorconfig.org](http://editorconfig.org/). There's also a `wma.sublime-project` that can be opened in Sublime Text.

## Testing

If possible, test your patch on a Firefox OS and Android device (4.2 is our baseline for support). If you don't have access to these devices, please test in Firefox and Chrome.

## Pull requests

- Try not to pollute your pull request with unintended changes – keep them simple and small. If possible, squash your commits.
- Try to share which browsers and devices your code has been tested in before submitting a pull request.
- If your PR resolves an issue, include **closes #ISSUE_NUMBER** in your commit message (or a [synonym](https://help.github.com/articles/closing-issues-via-commit-messages)).
