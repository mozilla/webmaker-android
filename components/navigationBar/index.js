module.exports = {
    id: 'navigationBar',
    template: require('./index.html'),
    data: {},
    attached: function () {
        var button = this.$el.getElementsByTagName('button')[0];
        if (typeof button !== 'undefined') {
            button.addEventListener('click', function (e) {
                history.back();
            });
        }
    }
};
