var view = require('../../lib/view');
var analytics = require('../../lib/analytics');

module.exports = view.extend({
  id: 'error',
  template: require('./index.html'),
  computed: {
    message: function () {
      var code = +this.$root.params.code;
      var message;
      switch (code) {
        case 404: {
          message = 'error404';
          break;
        }
        default: {
          message = 'defaultError';
        }
      }
      analytics.error({
        description: message
      });
      return message;
    }
  },
  created: function () {
    this.$root.isReady = true;
    console.error('Error ' +
      this.$root.params.code +
      ': ' +
      global.location.pathname);
  }
});
