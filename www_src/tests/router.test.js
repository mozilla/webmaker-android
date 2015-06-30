global.window = {};

var should = require('should');
var React = require('react');
var router = require('../lib/router');

function resetAndroidApi() {
  router.android = {
    getUserSession: () => {},
    getRouteParams: () => {},
    getRouteData: () => {},
    clearRouteData: () => {},
    getMemStorage: () => {},
    setMemStorage: () => {}
  };
}

describe('router', function () {

  afterEach(resetAndroidApi);

  describe('#getRouteParams', function () {
    beforeEach(resetAndroidApi);

    it('should return test data when window.Platform does not exist', function () {
      router.android = null;
      should.deepEqual(router.getRouteParams(), {
        user: 1,
        project: 1,
        page: 1,
        element: 1,
        mode: 'play',
        propertyName: 'borderColor'
      });
    });

    it('should return undefined route params as an empty object', function () {
      router.android.getRouteParams = () => {};
      should.deepEqual(router.getRouteParams(), {});
    });

    it('should return an empty string as an empty object', function () {
      router.android.getRouteParams = () => '';
      should.deepEqual(router.getRouteParams(), {});
    });

    it('should return an invalid string as an empty object', function () {
      router.android.getRouteParams = () => 'invalid blah';
      should.deepEqual(router.getRouteParams(), {});
    });

    it('should return route params as json', function () {
      var fakeRoute = {project: 1, page: 2};
      router.android.getRouteParams = () => {
        return JSON.stringify(fakeRoute);
      };

      should.deepEqual(router.getRouteParams(), fakeRoute);
    });

  });

  describe('#getRouteData', function () {
    beforeEach(resetAndroidApi);

    it('should get return an empty object if no window.Platform', function () {
      router.android = null;
      should.deepEqual(router.getRouteData(), {});
    });

    it('should return an empty object if routeData is undefined', function () {
      router.android.getRouteData = () => {};
      should.deepEqual(router.getRouteData(), {});
    });

    it('should return an empty object if routeData is an empty string', function () {
      router.android.getRouteData = () => '';
      should.deepEqual(router.getRouteData(), {});
    });

    it('should return an empty object if routeData is invalid JSON', function () {
      router.android.getRouteData = () => 'invalid';
      should.deepEqual(router.getRouteData(), {});
    });

    it('should return routeData as an object', function () {
      var fakeData = {foo: 'bar', baz: 'qux'};
      router.android.getRouteData = () => {
        return JSON.stringify(fakeData);
      };
      should.deepEqual(router.getRouteData(), fakeData);
    });

  });

  describe('#getUserSession', function () {
    beforeEach(resetAndroidApi);

    it('should return test data if no window.Platform', function () {
      router.android = null;
      should.deepEqual(router.getUserSession(),  {
        user: {
          id: 1,
          username: 'jonatmozilla',
          avatar: 'https://secure.gravatar.com/avatar/c1b6f037ee7e440940d3c0c6ebeb8ba2?d=https%3A%2F%2Fstuff.webmaker.org%2Favatars%2Fwebmaker-avatar-200x200.png',
          prefLocale: 'en-US'
        },
        token: 'validToken'
      });
    });

    it('should return user and token if they exist', function () {
      var fakeSession = {
        user: {
          username: 'blah',
          id: 123
        },
        token: 'fooT0ken'
      };
      router.android.getUserSession = () => JSON.stringify(fakeSession);
      should.deepEqual(router.getUserSession(), fakeSession);
    });

    it('should return an empty object if there is no session', function () {
      router.android.getUserSession = () => {};
      should.deepEqual(router.getUserSession(), {});
    });

    it('should return an empty object if the session is invalid JSON', function () {
      router.android.getUserSession = () => '';
      should.deepEqual(router.getUserSession(), {});
    });
  });

  describe('#getInitialState', function () {
    beforeEach(resetAndroidApi);
    it('should add appropriate empty objects for params, routeData, token, and user', function () {
      should.deepEqual(router.getInitialState(), {
        params: {},
        routeData: {},
        user: {},
        token: ''
      });
    });
    it('should return appropriate test data if no window.Platform', function () {
      router.android = null;
      should.deepEqual(router.getInitialState(), {
        params: router.getRouteParams(),
        routeData: router.getRouteData(),
        user: router.getUserSession().user,
        token: router.getUserSession().token
      });
    });
  });

});
