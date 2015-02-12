module.exports = {
    className: 'toggle',
    template: require('./index.html'),
    paramAttributes: ['disabled', 'checked', 'toggle-id'],
    methods: {
        onClick: function (e) {
            e.preventDefault();

            if (this.disabled) {
                return;
            }

            this.setState(!this.checked);
        },
        setState: function (state) {
            this.checked = state;

            this.$data.iconClass = this.checked ?
                'ion-android-checkbox-outline' :
                'ion-android-checkbox-outline-blank';

            this.$dispatch('toggleChange', {
                value: this.checked, source: this['toggle-id']
            });
        }
    },
    ready: function () {
        // parse non booleans
        // eg: values passed in as a "disabled" param instead of v-with
        if (typeof this.disabled === 'string') {
            this.disabled = this.disabled === 'true';
        }

        this.setState(this.checked);
    },
    data: {
        iconClass: 'ion-android-checkbox-outline-blank'
    }
};
