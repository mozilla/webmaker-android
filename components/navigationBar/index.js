var page = require('page');
var Hammer = require('hammerjs');

module.exports = {
    id: 'navigationBar',
    template: require('./index.html'),
    data: {
        goBack: function (e) {
            if (this.$data.app) {
                var enteredFrom = this.$root.$data.enteredEditorFrom || '';
                if (enteredFrom) {
                    page(enteredFrom);
                    return;
                }
            }
            e.preventDefault();
            global.history.back();
        }
    },
    ready: function () {
        var recognizer = new Hammer.Manager(this.$el);
        recognizer.add(new Hammer.Press({
            event: 'press',
            pointer: 1,
            threshold: 5,
            time: 2000
        }));

        recognizer.on('press', function (event) {
            page('/healthcheck');
        });
    }
};
