var templates = require('../../lib/templates.json');
var view = require('../../lib/view');

module.exports = view.extend({
  id: 'templates',
  template: require('./index.html'),
  data: {
    title: 'Make Your Own App',
    templates: templates
  },
  methods: {
    createBlank: function (e, id) {
      if (id === 'blank') {
        e.preventDefault();
        this.createAppFromTemplate(id);
      }
    }
  }
});
