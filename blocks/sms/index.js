var block = require('../../lib/block');

module.exports = block.extend({
    id: 'sms',
    template: require('./index.html'),
    ready: function () {
        var self = this;
        self.$el.addEventListener('click', function (e) {
            if (!window.MozActivity) return;
            if (self.$parent.$parent.$data.params.mode !== 'play') return;

            e.preventDefault();
            new MozActivity({
                name: 'new',
                data: {
                    type: 'websms/sms',
                    number: e.target.getAttribute('value')
                }
            });
        });
    }
});
