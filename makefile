BROWSERIFY = ./node_modules/.bin/browserify
WATCHIFY = ./node_modules/.bin/watchify
TARGET = -e ./lib/index.js -t partialify -o ./build/index.js

JSCS = ./node_modules/.bin/jscs --reporter=inline
JSHINT = ./node_modules/.bin/jshint
MOCHA = ./node_modules/.bin/mocha

# ------------------------------------------------------------------------------

build:
	@make clean
	$(BROWSERIFY) $(TARGET)
	cp -av ./static/. ./build/

clean:
	rm -rf ./build/*

dev:
	$(WATCHIFY) $(TARGET)

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

.PHONY: build clean dev lint unit integration test