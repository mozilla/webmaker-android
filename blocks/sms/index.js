var block = require('../../lib/block');

module.exports = block.extend({
    className: 'sms',
    template: require('./index.html'),
    data: {
        name: 'SMS',
        attributes: {
            value: {
                label: 'Phone #',
                type: 'string',
                value: '+18005555555'
            },
            innerHTML: {
                label: 'Label',
                type: 'string',
                value: 'Send SMS'
            }
        }
    },
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
