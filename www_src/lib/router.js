var {parseJSON} = require('./jsonUtils');

module.exports = {

  android: window.Android,

  getRouteParams: function () {
    var params = {};

    if (this.android) {
      // Check to see if route params exist & create cache key
      var routeParams = this.android.getRouteParams();
      var key = 'route::params';

      // If they do, save them. If not, fetch from storage
      if (routeParams !== '{}') {
        params = parseJSON(routeParams);
        this.android.setMemStorage(key, routeParams);
      } else {
        var hit = this.android.getMemStorage(key);
        params = parseJSON(hit);
      }
    } else {
      params = {
        mode: 'play', // 'edit', 'play', 'link'
        user: 1,
        project: 1,
        page: 1,
        element: 1,
        propertyName: 'borderColor'
      };
    }

    return params;
  },

  getRouteData: function () {
    var data = {};

    if (this.android) {
      data = parseJSON(this.android.getRouteData());
      this.android.clearRouteData();
    }

    return data;
  },

  // #getUserSession ()
  //
  // Returns user session from android if it exists,
  // or else an empty object.
  // if window.Android doesn't exist, returns test data
  // e.g.
  // {
  //  user: {id: 1, username: 'foo', ...},
  //  token: 'validToken'
  // }
  getUserSession: function () {
    var session = {};

    if (this.android) {
      session = parseJSON(this.android.getUserSession());
    } else {
      // For testing
      session =  {
        user: {
          id: 1,
          username: 'jonatmozilla',
          avatar: 'https://secure.gravatar.com/avatar/c1b6f037ee7e440940d3c0c6ebeb8ba2?d=https%3A%2F%2Fstuff.webmaker.org%2Favatars%2Fwebmaker-avatar-200x200.png',
          prefLocale: 'en-US'
        },
        token: 'validToken'
      };
    }

    return session;
  },

  getInitialState: function () {
    var session = this.getUserSession();
    return {
      params: this.getRouteParams(),
      routeData: this.getRouteData(),
      user: session.user || {},
      token: session.token || ''
    };
  }
};
