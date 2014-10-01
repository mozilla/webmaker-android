module.exports = {
    id: 'tabBar',
    template: require('./index.html'),
    data: {},
    attached: function () {
        var el = this.$el;
        function onFocus(e) {
            if (!e.target.tagName) return;
            var tagName = e.target.tagName.toLowerCase();
            var type = e.target.getAttribute('type');
            if (['input', 'textarea'].indexOf(tagName) <= -1) {
                return;
            }
            if (type === 'checkbox') {
                return;
            }
            el.style.display = 'none';
        }
        function onBlur() {
            el.style.display = 'block';
        }
        document.addEventListener('focus', onFocus, true);
        document.addEventListener('blur', onBlur, true);
    }
};
