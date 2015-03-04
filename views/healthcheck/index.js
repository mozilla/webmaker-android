var view = require('../../lib/view');
var clone = require('clone');
var _config = require('../../config');
var config = clone(_config);
var packageJSON = clone(config.package);
var i18n = require('../../lib/i18n.js');
var langmap = require('langmap');
delete config.package;

module.exports = view.extend({
  id: 'healthcheck',
  template: require('./index.html'),
  data: {
    title: 'Developer Health Check',
    back: '/profile',
    config: config,
    package: packageJSON
  },
  computed: {
    options: function () {
      return i18n.supportedLangs();
    }
  },
  methods: {
    langmap: function (locale) {
      return langmap[locale].nativeName;
    },
    clean: function (e) {
      var self = this;
      var storage = self.$root.storage;
      self.$data.myApps = storage.getApps();
      var sure = window.confirm('Are you sure you want to delete all of your apps? There is no going back :)');
      if (sure) {
        self.$data.myApps.forEach(function (app) {
          self.$root.storage.getApp(app.id).removeApp();
        });
        self.$data.myApps = [];
        self.page(this.$data.back);
      }
    },
    selectedLang: function (e) {
      if (e.target.value === 'use-default') {
        this.model.data.session.locale = navigator.language;
        i18n.setLocale(this.model.data.session.locale, true);
      } else {
        i18n.setLocale(e.target.value, true);
      }
      this.page(this.$data.back);
    }
  },
  ready: function () {
    this.$data.currentLang = this.model.data.session.locale;
  }
});
