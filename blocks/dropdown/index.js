module.exports = {
  className: 'dropdown',
  template: require('./index.html'),
  data: {
    name: 'Dropdown',
    icon: 'images/blocks_text.png',
    attributes: {
      label: {
        label: 'Title',
        type: 'string',
        value: '',
        placeholder: 'Your title goes here',
        skipAutoRender: true
      },
      color: {
        label: 'Title Text Color',
        type: 'color',
        value: '#638093'
      },
      elements: {
        label: 'Options',
        type: 'list',
        skipAutoRender: true,
        items: ['', '']
      }
    }
  },
  methods: {
    reportDataChange: function (self) {
      self.$dispatch('dataChange',
        this.$index,
        self.$el.querySelector('select').value
      );
    }
  },
  ready: function () {
    var self = this;

    // register block on data object
    self.$dispatch('dataChange',
      self.$index,
      '',
      self.$data.attributes.label.value
    );
  }
};
