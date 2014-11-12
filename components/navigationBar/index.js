var page = require('page');

module.exports = {
    id: 'navigationBar',
    template: require('./index.html'),
    data: {
        goBack: function (e) {
            if (this.$data.app) {
                var enteredFrom = this.$data.app.enteredEditorFrom || '';
                if (enteredFrom === 'templates') {
                    page('/templates');
                    return;
                }
                if (enteredFrom === 'profile') {
                    page('/profile');
                    return;
                }
            }
            e.preventDefault();
            global.history.back();
        }
    }
};
