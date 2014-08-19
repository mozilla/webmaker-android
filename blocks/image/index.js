module.exports = {
    id: 'image',
    template: require('./index.html'),
    created: function () {
        var attr = this.$data.attributes;
        var target = this.$el.firstChild;

        for (var i = 0; i < attr.length; i++) {
            target.setAttribute(attr[i].id, attr[i].value);
        }
    }
};
