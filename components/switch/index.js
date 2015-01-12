module.exports = {
    id: 'switch',
    template: require('./index.html'),
    data: {
        value: false,
        options: ['Off', 'On']
    },
    methods: {
      onClick: function (event) {
        this.value = !this.value;
      }
    }
};
