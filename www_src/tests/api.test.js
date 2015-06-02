global.window = {}

var should = require('should');
var proxyquire = require('proxyquire');
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

// Mock window.Android,
// re-require api with xhrMock if provided,
// override uris so they're easier to target
function resetMocks(xhrMock) {
  global.window.Android = {};
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
});
