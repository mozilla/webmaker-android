module.exports = {
  className: 'separator',
  template: require('./index.html'),
  data: {
    name: 'Separator',
    icon: 'images/blocks_separator.png',
    attributes: {
      color: {
        label: 'Color',
        type: 'color',
        value: '#333333'
      }
    }
  }
};
