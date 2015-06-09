var React = require('react/addons');
var render = require('../../lib/render.jsx');

var Loading = require('../../components/loading/loading.jsx');
var SignIn = require('./sign-in.jsx');
var SignUp = require('./sign-up.jsx');

// <Login />
// View that renders sign-in and sign-up forms
var Login = React.createClass({
  // Props:
  //   (none)

  // State:
  //   mode
  //     ['sign-in', 'sign-up']
  //     Indicates which form is currently visible
  //  loading
  //     boolean
  //     Turns the UI-blocking loader on/off
  getInitialState: function () {
    return {
      mode: 'sign-up',
      loading: false
    };
  },
  componentWillMount: function () {
    this.props.update({
      onBackPressed: () => {
        window.Android.goToHomeScreen();
      }
    });
  },
  setParentState: function (state) {
    this.setState(state);
  },
  render: function () {
    return <div id="login">
      <div className="logo"><img src="../../img/single-wordmark.svg" /></div>
      <SignIn show={this.state.mode === 'sign-in'} setParentState={this.setParentState} />
      <SignUp show={this.state.mode === 'sign-up'} setParentState={this.setParentState} />
      <Loading on={this.state.loading} />
    </div>;
  }
});

render(Login);
