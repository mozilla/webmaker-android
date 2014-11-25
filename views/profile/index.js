var view = require('../../lib/view');
var page = require('page');

module.exports = view.extend({
    id: 'profile',
    template: require('./index.html'),
    data: {
        title: 'My Profile',
        back: false,
        myApps: []
    },
    computed: {
        user: function () {
            return this.model.data.session.user;
        }
    },
    methods: {
        logout: function (e) {
            e.preventDefault();
            this.model.auth.logout();
        },
        clean: function (e) {
            self.$data.myApps.forEach(function (app) {
                self.model.firebase.child(app.id).remove();
            });
        }
    },
    created: function () {
        var self = this;
        var user = self.model.data.session.user;

        self.$data.myApps = [];

        function onRemoved(snapshot) {
            var key = snapshot.key();
            var index;
            self.$data.myApps.forEach(function (app, i) {
                if (app.id === key) index = i;
            });
            if (index) self.$data.myApps.splice(index, 1);
        }

        function onChanged(snapshot) {
            var key = snapshot.key();
            var val = snapshot.val();
            if (!val) return;
            val.id = key;
            self.$data.myApps.forEach(function (app, i) {
                if (app.id === key) {
                    self.$data.myApps[i] = val;
                }
            });
        }

        function onAdded(snapshot) {
            var data = snapshot.val();
            var dupe;
            if (!data) return;
            data.id = snapshot.key();
            // Duplicates
            self.$data.myApps.forEach(function (app) {
                if (app.id === data.id) dupe = true;
            });
            if (!dupe) self.$data.myApps.push(data);
        }

        if (user && user.id) {
            var query = self.model.firebase
                .orderByChild('userId')
                .equalTo(user.id);

            query.on('child_added', onAdded);
            query.on('child_changed', onChanged);
            query.on('child_removed', onRemoved);
        }
    }
});
