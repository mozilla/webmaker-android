var view = require('../../lib/view');

module.exports = view.extend({
    id: 'profile',
    template: require('./index.html'),
    data: {
        title: 'Profile'
    },
    methods: {
      clean: function (e) {
        var sh = this.model._fs.Shell();
        var fs = this.model._fs;
        var sync = fs.sync;
          fs.stat('/', function(e, stat) {
          if (!stat.isDirectory()) {
            fs.unlink('/', function(e) {
              sync.request();
            });
          } else {
            sh.rm('/', {
              recursive: true
            }, function(e) {
              console.log(e);
              sync.request();
            });
          }
        });
      }
    },
    created: function () {
        this.$data = this.model.user;
    },
    detached: function () {
        this.model.user.name = this.$data.name;
        this.model.user.location = this.$data.location;
        this.model.user.avatar = this.$data.avatar;
    }
});
