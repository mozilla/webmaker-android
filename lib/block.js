var Vue = require('vue');

module.exports = Vue.extend({
    computed: {
        isEditing: function () {
            return this.$root.isEditing;
        }
    },
    created: function () {
        var self = this;

        var attrs = self.$data.attributes;
        var target = self.$el.firstChild;

        var handle = document.createElement('span');
        handle.className = 'draggable-handle';
        handle.innerHTML = '<span class="fa fa-bars"></span>';
        self.$el.appendChild(handle);

        for (var id in attrs) {
            if (attrs.hasOwnProperty(id) && attrs[id].skipAutoRender !== true) {
                target.setAttribute(id, attrs[id].value);

                switch (id) {
                case 'innerHTML':
                    target.innerHTML = attrs[id].value;
                    break;
                case 'color':
                    target.style.color = attrs[id].value;
                    break;
                case 'font-size':
                    target.style.fontSize = attrs[id].value + 'px';
                }
            }
        }
    }
});
