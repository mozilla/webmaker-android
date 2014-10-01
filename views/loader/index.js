var view = require('../../lib/view');
var i18n = require('../../lib/i18n');

module.exports = view.extend({
    id: 'loader',
    template: require('./index.html'),
    ready: function () {
        var self = this;

        self.model.restore(function (err) {
            if (err) throw new Error('Could not restore user state.');

            i18n.setLocale(self.model.locale, true);

            var pathname = window.location.pathname;
            console.log('[Loader] ' + pathname);

            // If cold start, restore from history
            if (pathname === '/' || pathname === '/index.html') {
                var restore = self.model.history.path;
                console.log('[Loader] Restore to ' + restore);
                if (restore === '/' || restore === '/index.html') {
                    restore = '/templates';
                }

                // Redirect
                self.page(restore);
            }

            //If within a "make", redirect to apps list
            // if (window.location.pathname.indexOf('/make') !== -1) {
            //     self.page('/apps');
            // }
        });
    }
});
