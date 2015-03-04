module.exports = {
  id: 'switch',
  template: require('./index.html'),
  ready: function () {
    this.$watch('value', function (newVal) {
      var chosenOption = 0 + newVal; // convert Boolean to Number
      chosenOption = this.options[chosenOption];
      this.$dispatch('switchValueChanged', chosenOption);
    });
  },
  data: {
    value: false,
    options: ['Off', 'On']
  },
  methods: {
    onClick: function (event) {
      if (this.options[(0 + this.value)] === event.target.textContent) {
        // is the current option the same as the option that was just
        // tapped on? if so, do nothing.
        return false;
      } else {
        this.value = !this.value;
      }
    }
  }
};
