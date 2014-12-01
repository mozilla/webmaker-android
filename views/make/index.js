var App = require('../../lib/app');
var view = require('../../lib/view');
var Data = require('../../lib/data');
var throttle = require('lodash.throttle');
var Sortable = require('sortable');

var sort;
var app;

module.exports = view.extend({
    id: 'make',
    template: require('./index.html'),
    partials: {
        navigation: require('./navigation.html'),
        settings: require('./settings.html')
    },
    methods: {
        goBack: function (e) {
            e.preventDefault();
            if (this.$data.mode === 'settings') {
                this.$data.changeMode('edit');
            } else {
                this.page('/profile');
            }
        },
        updateName: throttle(function (newVal) {
            app.update({
                name: newVal
            });
        }, 3000)
    },
    created: function () {
        var self = this;

        // Mode
        self.$data.changeMode = function (mode) {
            var modes = ['edit', 'play', 'data', 'settings'];
            if (modes.indexOf(mode) === -1) {
                console.log('warning: ' + mode + ' is not a valid mode');
                mode = 'edit';
            }
            if (mode === 'settings' && self.$data.mode === 'settings') {
                mode = 'edit';
            }
            self.$data.mode = mode;
            self.$root.isEditing = self.$data.mode === 'edit';
        };

        var regex = new RegExp('[\\?&]mode=([^&#]*)');
        var results = regex.exec(window.location.search);

        var mode = results ? results[1] : 'edit';
        self.$data.changeMode(mode);

        // Fetch app
        var id = self.$root.$data.params.id;

        app = new App(id);

        self.$data.onDone = '/make/' + id + '/share?publish=true';
        self.$data.offlineUser = this.model.data.session.offline;

        var list = self.$el.querySelector('#blocks');

        function getIndex(nodeList, el) {
            for (var i = 0; i < nodeList.length; i++) {
                if (nodeList[i] === el) {
                    return i;
                }
            }
        }
        var isDragging = false;

        function onValue(snapshot) {
            self.$root.isReady = true;

            if (isDragging) return;

            if (!snapshot.val()) return;
            self.$data.app = snapshot.val();
            self.$data.app.id = snapshot.key();

            var blocks = snapshot.val().blocks;

            try {
                if (sort) sort.destroy();
            } catch (e) {
                console.log('sort error', e);
            }

            sort = new Sortable(list, {
                handle: '.draggable-handle',
                scroll: self.$root.$el,
                onStart: function () {
                    isDragging = true;
                },
                onEnd: function (e) {
                    isDragging = false;

                    var el = e.target;
                    var lis = list.querySelectorAll('li');
                    var start = el.getAttribute('index');
                    var end = getIndex(lis, el);

                    isDragging = false;

                    blocks.splice(end, 0, blocks.splice(start, 1)[0]);
                    app.update({
                        blocks: blocks
                    });
                }
            });
        }
        app.storage.on('value', onValue);

        self.$data.goTo = function (href, $event) {
            if (self.$data.mode !== 'edit') return;
            self.page(href);
        };

        self.$data.removeApp = function () {
            app.removeApp();
            self.page('/profile');
        };

        // Fetch collected Data
        var data = new Data(id);

        self.currentDataSets = [];
        data.getAllDataSets(function (currentDataSets) {
            self.$data.initialDataLoaded = true;
            self.currentDataSets = currentDataSets;
        });

        self.$on('dataChange', function (index, value, label) {
            data.collect(index, value, label);
        });

        self.$on('dataSave', function () {
            if (data.getCurrentCollectedCount() > 0) {
                data.save();
                self.$broadcast('dataSaveSuccess');
            }
        });

        // listen for deletion requests
        self.$on('dataDelete', function (firebaseId) {
            data.delete(firebaseId);
        });
    }
});
