var view = require('../../lib/view');
var Data = require('../../lib/data');
var analytics = require('../../lib/analytics');

var app;

module.exports = view.extend({
  id: 'detail',
  template: require('./index.html'),
  data: {
    back: true,
    title: 'App',
    subView: 'myApp'
  },
  methods: {
    onRemix: function (e) {
      var self = this;
      e.preventDefault();
      self.$root.storage.remix(this.$data.id, function (data) {
        self.page('/make/' + data.id);
      });
    },
    deleteClick: function () {
      this.$dispatch('showShim');
      this.$dispatch('openModalPrompt', {
        type: 'delete'
      });
    },
    removeApp: function () {
      app.removeApp();
      this.page('/profile');
    }
  },
  created: function () {
    var self = this;
    var id = self.$root.params.id;

    self.$data.id = id;

    self.$data.isAdmin = self.$root.params.role === 'admin';

    // Fetch app
    app = self.$root.storage.getApp(id);

    if (app.data) {
      self.$root.isReady = true;
      self.$data.app = app.data;
    }

    self.$on(id, function (val) {
      self.$root.isReady = true;
      self.$data.app = val;
    });

    var data = new Data(id);

    self.currentDataSets = [];
    data.fetch(function (err, currentDataSets) {
      self.$data.initialDataLoaded = true;
      self.currentDataSets = currentDataSets;
    });
  },
  ready: function () {
    var self = this;

    self.$on('switchValueChanged', function (event) {
      if (event === 'My App') {
        self.subView = 'myApp';
        analytics.event({
          category: 'My App',
          action: 'Switch',
          label: 'My App'
        });
      } else if (event === 'App Data') {
        self.subView = 'appData';
        analytics.event({
          category: 'My App',
          action: 'Switch',
          label: 'App Data'
        });
      }
    });

    self.$on('toggleChange', function (event) {
      if (event.source === 'showInGallery') {
        app.update({
          isDiscoverable: event.value
        });
        analytics.event({
          category: 'Discover Gallery',
          action: 'Set Discover Gallery Status',
          label: event.value
        });
      }
    });

    self.$on('onConfirmClick', function (event) {
      console.warn('Deleting app!');
      self.removeApp();
    });
  }
});
