var view = require('../../lib/view');

module.exports = view.extend({
    id: 'detail',
    template: require('./index.html'),
    data: {
        back: true,
        title: 'App'
    },
    methods: {
        onRemix: function (e) {
            var self = this;
            e.preventDefault();
            self.$root.storage.remix(this.$data.id, function (data) {
                self.page('/make/' + data.id);
            });
        }
    },
    created: function () {
        var self = this;
        var id = self.$root.params.id;

        self.$data.id = id;

        function setAdmin(app) {
            var userId = self.model.data.session.user.id;
            self.$data.isAdmin = app.author.id === userId;
        }

        // Fetch app
        var app = self.$root.storage.getApp(id);
        if (app.data) {
            self.$root.isReady = true;
            self.$data.app = app.data;
            setAdmin(app.data);
        }

        self.$on(id, function (val) {
            self.$root.isReady = true;
            self.$data.app = val;
            setAdmin(val);
        });
    }
});
