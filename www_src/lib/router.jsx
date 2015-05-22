module.exports = {
  android: window.Android,
  getRouteParams: function () {
    var r = {};

    if (this.android) {
      // Check to see if route params exist & create cache key
      var routeParams = this.android.getRouteParams();
      var key = 'state::route';

      // If they do, save them. If not, fetch from SharedPreferences
      if (routeParams !== '{}') {
        r = JSON.parse(routeParams);
        this.android.setSharedPreferences(key, routeParams, true);
      } else {
        var hit = this.android.getSharedPreferences(key, true);
        try {
          r = JSON.parse(hit);
        } catch (e) {}
      }
    } else {
      r = {
        // mode: 'play',
        user: 1,
        project: 21,
        page: 1,
        element: 1
      };
    }

    return r;
  },
  getInitialState: function () {
    return {
      params: this.getRouteParams()
    };
  }
};
