BROWSERIFY = ./node_modules/.bin/browserify
LESSC = ./node_modules/.bin/lessc
WATCHIFY = ./node_modules/.bin/watchify
TARGET = -e ./lib/index.js -t partialify -o ./build/index.js

JSCS = ./node_modules/.bin/jscs --reporter=inline
JSHINT = ./node_modules/.bin/jshint
MOCHA = ./node_modules/.bin/mocha
MOCHAPHANTOMJS = ./node_modules/.bin/mocha-phantomjs
PHANTOMJS = ./node_modules/.bin/phantomjs

# ------------------------------------------------------------------------------

build:
	@make clean
	$(BROWSERIFY) $(TARGET)
	cp -av ./static/. ./build/
	cat `find ./views -name "*.less"` > ./build/styles/views.less
	cat `find ./components -name "*.less"` > ./build/styles/components.less
	$(LESSC) -x ./build/styles/common.less ./build/styles/common.css

clean:
	rm -rf ./build
	mkdir build

dev:
	$(WATCHIFY) $(TARGET)

# ------------------------------------------------------------------------------

lint:
	$(JSHINT) ./lib/*.js
	$(JSHINT) ./test/integration/*.js
	$(JSHINT) ./test/unit/*.js

	$(JSCS) ./lib/*.js
	$(JSCS) ./test/integration/*.js
	$(JSCS) ./test/unit/*.js

unit:
	$(MOCHA) -R spec ./test/unit/*.js

integration:
	$(MOCHAPHANTOMJS) -p $(PHANTOMJS) -R spec ./test/fixtures/runner.html

test:
	@make lint
	@make unit
	@make integration

# ------------------------------------------------------------------------------

.PHONY: build clean dev lint unit integration test
