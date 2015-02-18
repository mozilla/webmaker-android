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
      selectedLang: function (e) {
          i18n.setLocale(e.target.value, true);
          this.page(this.$data.back);
      }
    },
    ready: function () {
        this.$data.currentLang = this.model.data.session.locale;
    }
});
