var App = require('../../lib/app');
var view = require('../../lib/view');
var throttle = require('lodash.throttle');
var Sortable = require('sortable');

var sort;
var app;

module.exports = view.extend({
    id: 'edit',
    template: require('./index.html'),
    data: {
        back: true,
        doneLabel: 'Publish'
    },
    methods: {
        updateName: throttle(function (newVal) {
            app.update({
                name: newVal
            });
        }, 3000)
    },
    created: function () {
        var self = this;

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
            } catch (e) {}

            sort = new Sortable(list, {
                handle: '.draggable-handle',
                scroll: self.$root.$el,
                onStart: function () {
                    isDragging = true;
                },
                onEnd: function (e) {
                    isDragging = false;

                    var lis = list.querySelectorAll('li');
                    var start = e.srcElement.getAttribute('index');
                    var end = getIndex(lis, e.srcElement);

                    isDragging = false;

                    blocks.splice(end, 0, blocks.splice(start, 1)[0]);
                    app.update({
                        blocks: blocks
                    });
                }
            });
        }
        app.storage.on('value', onValue);

        self.$data.goTo = function (href) {
            self.page(href);
        };

        self.$data.removeApp = function () {
            app.removeApp();
            self.page('/profile');
        };
    },
    detached: function () {
        try {
            if (sort) sort.destroy();
        } catch (e) {}
    }
});
