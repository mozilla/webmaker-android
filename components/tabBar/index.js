module.exports = {
    id: 'tabBar',
    template: require('./index.html'),
    data: {},
    attached: function () {
        var el = this.$el;
        var inputs = document.querySelectorAll('input, te');
        function onFocus(e) {
            if (!e.target.tagName) return;
            var tagName = e.target.tagName.toLowerCase();
            if (['input', 'textarea'].indexOf(tagName) <= -1) {
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
