module.exports = {
  getRouteParams: function () {
    var p = {};
    if (window.Android) {
      p = JSON.parse(window.Android.getRouteParams());
    }

    return p;
  }
};
