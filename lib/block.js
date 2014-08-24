var Vue = require('vue');

module.exports = Vue.extend({
    created: function () {
        var attr = this.$data.attributes;
        var target = this.$el.firstChild;

        for (var i = 0; i < attr.length; i++) {
            target.setAttribute(attr[i].id, attr[i].value);

            switch (attr[i].id) {
            case 'innerHTML':
                target.innerHTML = attr[i].value;
                break;
            case 'color':
                target.style.color = attr[i].value;
                break;
            case 'phone':
                target.value = attr[i].value;
                break;
            }
        }
    }
});
