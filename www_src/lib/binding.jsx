module.exports = {
  componentWillMount: function () {
    if (window.Android) {
      var state = JSON.parse(window.Android.getState());
      this.setState(state);
    }
  },
  componentDidUpdate: function () {
    if (window.Android) window.Android.setState(JSON.stringify(this.state));
  }
};
