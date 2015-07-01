global.window = {}

var should = require('should');
var proxyquire = require('proxyquire');
var assign = require('react/lib/Object.assign');
var api;

// Lets us mock an xhr response based on the uri
function createMockXhr(routes) {
  return function (options, callback) {
    Object.keys(routes).forEach(route => {
      if (options.uri === route) {
        if (routes[route].callback) routes[route].callback(options);
        callback(
          routes[route].error,
          {statusCode: routes[route].statusCode || 200},
          routes[route].body
        );
      }
    });
  }
}

// Mock window.Platform,
// re-require api with xhrMock if provided,
// override uris so they're easier to target
function resetMocks(xhrMock) {
  global.window.Platform = {
    getUserSession: function () {
      return {
        user: {
          username: 'foo'
        },
        token: 'fakeToken'
      };
    }
  };
  api = proxyquire('../lib/api', {
    xhr: xhrMock || function() {}
  });
  api.AUTHENTICATE_URI = '/authenticate';
  api.USER_URI = '/user';
  api.SIGN_UP_URI = '/sign-up';
}

describe('api', function () {

  afterEach(function () {
    resetMocks();
  });

  describe('#requiredOptions', function () {
    resetMocks();
    it('should not throw if all arguments are included', function () {
      should.doesNotThrow(function () {
        api.requiredOptions({foo: 'foo'}, ['foo']);
      });
    });
    it('should not throw if there are no required options', function () {
      should.doesNotThrow(function () {
        api.requiredOptions({});
      });
    });
    it('should throw if no options are provided', function () {
      should.throws(function () {
        api.requiredOptions(null);
      });
    });
    it('should throw if required options are missing', function () {
      should.throws(function () {
        api.requiredOptions({bar: 'foo'}, ['foo']);
      });
    });
  });

  describe('#requiredCallback', function () {
    resetMocks();
    it('should not throw if all callback is provided', function () {
      should.doesNotThrow(function () {
        api.requiredCallback(function(){});
      });
    });
    it('should not throw if something other than a function is provided', function () {
      should.throws(function () {
        api.requiredCallback('foo');
      });
    });
    it('should not throw if no arguments are provided', function () {
      should.throws(function () {
        api.requiredCallback();
      });
    });
  });

  describe('#authenticate', function () {
    it('should return a session object for 200 responses', function (done) {

      resetMocks(createMockXhr({
        '/authenticate': {
          body: {access_token: 'foo'}
        },
        '/user': {
          body: {username: 'k88'}
        }
      }));

      api.authenticate({json: {username: 'k88', password: '123'}}, function (err, data) {
        should.deepEqual(data, {token: 'foo', user: {username: 'k88'}});
        done();
      });
    });

    it('should call /user with token received from /authenticate', function (done) {

      resetMocks(createMockXhr({
        '/authenticate': {
          body: {access_token: 'foo'}
        },
        '/user': {
          body: {username: 'k88'},
          callback: function (options) {
            should.deepEqual(options.headers, {Authorization: 'token foo'});
          }
        }
      }));

      api.authenticate({json: {username: 'k88', password: '123'}}, done);
    });

    it('should not do second API call if options.user is provided', function (done) {

      var wasCalled = false;

      resetMocks(createMockXhr({
        '/authenticate': {
          body: {access_token: 'foo'}
        },
        '/user': {
          body: {username: 'k88'},
          callback: function () {
            wasCalled = true;
          }
        }
      }));

      api.authenticate({user: {foo: 'bar'}, json: {username: 'k88', password: '123'}}, function (err, data) {
        should.equal(wasCalled, false);
        should.deepEqual(data, {token: 'foo', user: {foo: 'bar'}});
        done();
      });
    });

    it('should return an error with a message for non-200 auth response', function (done) {

      resetMocks(createMockXhr({
        '/authenticate': {
          statusCode: 400,
          body: {message: 'Wrong!'}
        },
        '/user': {
          body: {username: 'k88'}
        }
      }));

      api.authenticate({json: {username: 'k88', password: '123'}}, function (err, data) {
        should.deepEqual(err, {message: 'Wrong!'});
        done();
      });
    });

    it('should return an error with a message for non-200 /user response', function (done) {

      resetMocks(createMockXhr({
        '/authenticate': {
          body: {access_token: 'foo'}
        },
        '/user': {
          statusCode: 401,
          body: {message: 'Oops'}
        }
      }));

      api.authenticate({json: {username: 'k88', password: '123'}}, function (err, data) {
        should.deepEqual(err, {message: 'Oops'});
        done();
      });
    });

  });

  describe('#signUp', function () {

    it('should return a session object for a 200 response', function (done) {
      resetMocks(createMockXhr({
        '/sign-up': {
          body: {username: 'k88'}
        },
        '/authenticate': {
          body: {access_token: 'foo'}
        }
      }));
      api.signUp({json: {username: 'k88', password: '123', email: 'k88@foo.com'}}, function (err, data) {
        should.deepEqual(data, {
          token: 'foo',
          user: {username: 'k88'}
        });
        done();
      });
    });

    it('should return an error for non-200 response', function (done) {
      resetMocks(createMockXhr({
        '/sign-up': {
          statusCode: 400,
          body: {message: 'Error'}
        },
        '/authenticate': {
          body: {access_token: 'foo'}
        }
      }));
      api.signUp({json: {username: 'k88', password: '123', email: 'k88@foo.com'}}, function (err, data) {
        should.deepEqual(err, {message: 'Error'});
        done();
      });
    });
  });

  describe('#getElement', function () {
    it('should throw if required options are missing', function () {
      resetMocks();
      should.throws(function () {
        api.getElement(null, function () {});
      });
    });
    it('should throw if required options are missing', function () {
      resetMocks();
      should.throws(function () {
        api.getElement({project: 1, page: 1, element: 1}, function () {});
      });
      should.throws(function () {
        api.getElement({user: 1, page: 1, element: 1}, function () {});
      });
      should.throws(function () {
        api.getElement({user: 1, project: 1, element: 1}, function () {});
      });
      should.throws(function () {
        api.getElement({user: 1, project: 1, page: 1}, function () {});
      });
    });
    it('should not throw if required options are 0', function () {
      resetMocks();
      should.doesNotThrow(function () {
        api.getElement({user: 0, project: 1, page: 1, element: 1}, function () {});
      });
    });
    it('should throw if callback is missing', function () {
      resetMocks();
      should.throws(function () {
        api.getElement({user: 1, project: 1, page: 1, element: 1});
      });
    });
    it('should return an element for a 200 response', function (done) {
      var fakeEl = {id: '1', attributes: {}, type: 'image'};

      resetMocks(function (options, callback) {
        callback(null, {statusCode: 200}, JSON.stringify({element: fakeEl}));
      });

      api.getElement({user: 1, project: 1, page: 1, element: 1}, function (err, data) {
        should.equal(err, null);
        should.deepEqual(data, fakeEl);
        done();
      });
    });
    it('should return an error with error.message for non-200 response', function (done) {
      var error = {message: 'Boom'};

      resetMocks(function (options, callback) {
        callback(null, {statusCode: 400}, JSON.stringify(error));
      });

      api.getElement({user: 1, project: 1, page: 1, element: 1}, function (err, data) {
        should.deepEqual(err, {
          statusCode: 400,
          message: 'Boom'
        });
        done();
      });
    });
  });

  describe('#updateElement', function () {
    it('should throw if options are missing', function () {
      resetMocks();
      should.throws(function () {
        api.updateElement(null, function () {});
      });
    });
    it('should throw if json is missing', function () {
      resetMocks();
      should.throws(function () {
        api.updateElement({project: 1, page: 1, element: 1}, function () {});
      });
    });
    it('should throw if callback is missing', function () {
      resetMocks();
      should.throws(function () {
        api.updateElement({user: 1, project: 1, page: 1, element: 1, json: {}});
      });
    });
    it('should return an element for a 200 response', function (done) {
      var fakeEl = {id: '1', foo: 'foo', type: 'image'};

      resetMocks(function (options, callback) {
        fakeEl = assign(fakeEl, options.json);
        should.equal(options.headers.Authorization, 'token fakeToken');
        callback(null, {statusCode: 200}, JSON.stringify({element: fakeEl}));
      });

      api.updateElement({user: 1, project: 1, page: 1, element: 1, json: {foo: 'bar'}}, function (err, data) {
        should.equal(err, null);
        should.deepEqual(data, {
          id: '1',
          foo: 'bar',
          type: 'image'
        });
        done();
      });
    });
    it('should return an error with error.message for non-200 response', function (done) {
      var error = {message: 'Boom'};

      resetMocks(function (options, callback) {
        callback(null, {statusCode: 400}, JSON.stringify(error));
      });

      api.updateElement({user: 1, project: 1, page: 1, element: 1, json: {foo: 'bar'}}, function (err, data) {
        should.deepEqual(err, {
          statusCode: 400,
          message: 'Boom'
        });
        done();
      });
    });
  });
});
