module.exports = {
    id: 'tabBar',
    template: require('./index.html'),
    data: {},
    attached: function () {
        var el = this.$el;
        var inputs = document.querySelectorAll('input, te');
        function onFocus() {
            el.style.opacity = 0;
        }
        function onBlur() {
            el.style.opacity = '';
        }
        document.addEventListener('focus', onFocus, true);
        document.addEventListener('blur', onBlur, true);
    }
};
