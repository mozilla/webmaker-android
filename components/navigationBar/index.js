var page = require('page');
module.exports = {
    id: 'navigationBar',
    template: require('./index.html'),
    data: {
        goBack: function (e) {
            e.preventDefault();
            global.history.back();
        }
    },
    created: function () {
        var self = this;
        var onDone = self.$data.onDone;
    }
};
