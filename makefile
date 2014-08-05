BROWSERIFY = ./node_modules/.bin/browserify
LESSC = ./node_modules/.bin/lessc

JSCS = ./node_modules/.bin/jscs --reporter=inline
JSHINT = ./node_modules/.bin/jshint
MOCHA = ./node_modules/.bin/mocha

# ------------------------------------------------------------------------------

build:
	@make clean
	$(BROWSERIFY) ./lib/index.js > ./build/index.js
	$(LESSC) ./styles/index.less > ./build/index.css
	cp -av ./static/. ./build/

clean:
	rm -rf ./build/*

# ------------------------------------------------------------------------------

lint:
	$(JSHINT) ./lib/*.js
	$(JSHINT) ./test/**/*.js

	$(JSCS) ./lib/*.js
	$(JSCS) ./test/**/*.js

unit:
	$(MOCHA) ./test/unit/*.js

integration:
	$(MOCHA) ./test/integration/*.js

test:
	@make lint
	@make unit
	@make integration

# ------------------------------------------------------------------------------

.PHONY: build clean lint unit integration test