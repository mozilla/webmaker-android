var page = require('page');

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

    }
};
