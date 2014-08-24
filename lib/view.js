var Vue = require('vue');

module.exports = Vue.extend({
    components: {
        appCell: require('../components/appCell'),
        makeBar: require('../components/makeBar'),
        navigationBar: require('../components/navigationBar'),
        tabBar: require('../components/tabBar'),
        templateCell: require('../components/templateCell'),

        headline: require('../blocks/headline'),
        image: require('../blocks/image'),
        paragraph: require('../blocks/paragraph'),
        sms: require('../blocks/sms')
    },
    data: {},
    methods: {
        model: require('./model'),
        page: require('page')
    },
    created: function () {
        var self = this;

        self.$on('ping', function (e) {
            console.log(e);
            console.dir(self.user);
        });
    }
});
