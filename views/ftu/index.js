var view = require('../../lib/view');
var i18n = require('../../lib/i18n');

module.exports = view.extend({
    id: 'ftu',
    template: require('./index.html'),
    directives: {
        cycle: {
            update: function (raw) {
                var self = this;
                var localized = raw.map(function (key) {
                    return i18n.get(key);
                });
                var i = 0;
                function changeWord() {
                    if (i >= localized.length) {
                        i = 0;
                    }
                    self.el.innerHTML = localized[i];
                    i++;
                }
                clearInterval(this.interval);
                this.interval = setInterval(changeWord, 3000);
                changeWord();
            },
            unbind: function () {
                clearInterval(this.interval);
            }
        }
    },
    data: {
        personas: [
            'vendors',
            'students',
            'teachers',
            'parents',
            'doctors',
            'activists',
            'journalists',
            'scientists',
            'you'
        ]
    }
});
