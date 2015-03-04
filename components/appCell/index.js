var i18n = require('../../lib/i18n');

module.exports = {
  className: 'app-cell',
  methods: {
    onClick: function () {
      this.$root.$data.enteredEditorFrom = '/profile';
    }
  },
  paramAttributes: ['appId', 'type'],
  template: require('./index.html'),
  computed: {
    guestKey: function () {
      return i18n.get('Guest');
    },
    url: function () {
      switch (this.type) {
        case 'profile': {
          return '/make/' + this.appId + '/detail/admin';
        }
        case 'discover': {
          return '/make/' + this.appId + '/detail';
        }
      }
    }
  },
  ready: function () {
    this.$data.view = this.$root.currentView;
  },
  data: {
    view: undefined
  }
};
