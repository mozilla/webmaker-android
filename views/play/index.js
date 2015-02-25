var view = require('../../lib/view');
var Data = require('../../lib/data');

module.exports = view.extend({
    id: 'play',
    template: require('./index.html'),
    data: {
        back: true,
        app: {}
    },
    ready: function () {
        var self = this;
        var id = self.$root.params.id;

        // Fetch app
        var ref = self.$root.storage._firebase.child(id);

        ref.once('value', function (snapshot) {
            self.$root.isReady = true;
            self.$data.app = snapshot.val();
            self.$data.app.id = snapshot.key();
        });

        // Handle save events
        // ---------------------------------------------------------------------
        var data = new Data(id);
        self.$on('dataSave', function () {
            data.collect(this.$el, function onDataSave(err) {
                if (err) return console.log('[Firebase] ' + err);
                self.$broadcast('dataSaveSuccess');
            });
        });
    }
});
