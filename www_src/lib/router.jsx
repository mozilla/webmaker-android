module.exports = {
  android: window.Android,
  getInitialState: function () {
    var r = {};

    if (this.android) {
      // Check to see if route params exist & create cache key
      var routeParams = this.android.getRouteParams();
      var key = 'state::route';

      // If they do, save them. If not, fetch from SharedPreferences
      if (routeParams !== '{}') {
        console.log('***** Route params exist *****');
        r = JSON.parse(routeParams);
        this.android.setSharedPreferences(key, routeParams, true);
      } else {
        console.log('***** Route params DON\'T exist *****');
        var hit = this.android.getSharedPreferences(key, true);
        console.dir(hit);
        r = JSON.parse(hit);
      }
    }

    return {
      route: r
    };
  }
};
