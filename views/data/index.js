var App = require('../../lib/app');
var view = require('../../lib/view');
var Data = require('../../lib/data');

module.exports = view.extend({
    id: 'data',
    template: require('./index.html'),
    data: {
        initialDataLoaded: false
    },
    created: function () {
        var self = this;

        // Fetch app
        var id = self.$parent.$data.params.id;
        var app = new App(id);

        app.storage.on('value', function (snapshot) {
            var val = snapshot.val();
            if (!val) return;
            // Bind app
            self.$data.app = val;
            self.$data.app.id = id;
            self.title = val.name;
        });

        // Fetch collected Data
        var data = new Data(id);

        self.currentDataSets = [];
        data.getAllDataSets(function (currentDataSets) {
            self.$data.initialDataLoaded = true;
            self.currentDataSets = currentDataSets;
        });

        // listen for deletion requests
        self.$on('dataDelete', function (firebaseId) {
            data.delete(firebaseId);
        });
    }
});
