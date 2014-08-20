var templates = require('../../lib/templates.json');
var view = require('../../lib/view');

module.exports = view.extend({
    id: 'block',
    components: {
        tabBar: require('../../components/tabBar'),
        navigationBar: require('../../components/navigationBar')
    },
    template: require('./index.html'),
    data: {
        back: true
    },
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
    },
    detached: function () {
        // @todo
    }
});
