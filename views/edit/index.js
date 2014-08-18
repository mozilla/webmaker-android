var templates = require('../../lib/templates.json');

module.exports = {
    id: 'edit',
    components: {
        makeBar: require('../../components/makeBar'),
        navigationBar: require('../../components/navigationBar'),

        image: require('../../blocks/image'),
        headline: require('../../blocks/headline'),
        copy: require('../../blocks/copy')
    },
    template: require('./index.html'),
    created: function () {
        var self = this;
        var target = this.$parent.$data.target;

        // Bind correct template to $data
        for (var i = 0; i < templates.length; i++) {
            if (templates[i].id === target) {
                self.$data = templates[i];
                self.$data.title = 'Untitled App';
                break;
            }
        }
    }
};