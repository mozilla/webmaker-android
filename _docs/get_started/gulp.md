# Gulp Tasks

Webmaker App uses the [Gulp build system](http://gulpjs.com/) to automate common development tasks. If you've used Grunt in the past it should feel quite similar.

To run the project locally you should already be familiar with `gulp dev`, which runs a local web server as well as watches for code changes to recompile.

There are several other Gulp tasks that you should familiarize yourself with as well.

## gulp lint

Running `gulp lint` will check that your code conforms to the [jshint](http://jshint.com/) and [jscs](http://jscs.info/) rules and conventions defined for the project. The options used are defined in two *rc* files contained in the root of the codebase: [.jshintrc](https://github.com/mozilla/webmaker-app/blob/master/.jshintrc) and [.jscsrc](https://github.com/mozilla/webmaker-app/blob/master/.jscsrc).

It's a good idea to familiarize yourself with the code conventions in the two *rc* files. Before code is accepted in a pull request it must pass `gulp lint`. If it doesn't, you'll see a failure message in your pull request and be asked to fix any problems before your patch is merged.

## gulp test

Running `gulp test` will run `gulp lint` as well as checking that all unit tests pass. This reduces the likelihood that your patch will introduce regressions into the codebase. You will need to ensure any patch you create passes `gulp test` before your pull request will be accepted.

## gulp build

If you're already running `gulp dev` then your code changes should automatically trigger recompilation of the project. However, if you ever need to build the project manually, you can simply run `gulp build` which will compile all LESS files and JavaScript.
