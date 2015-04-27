module.exports = {
  android: window.Android,
  componentWillMount: function () {
    if (this.android) {
      var state = JSON.parse(this.android.getState());
      this.setState(state);
    }
  },
  componentDidUpdate: function () {
    if (this.android) this.android.setState(JSON.stringify(this.state));
  }
};
