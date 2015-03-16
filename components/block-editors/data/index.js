var Data = require('../../../lib/data');

module.exports = {
  id: 'data-editor',
  template: require('./index.html'),
  data: {
    options: ['Newest', 'Oldest'],
    currentDataSets: {},
    initialDataLoaded: false,
    isInteractive: true
  },
  ready: function () {
    var self = this;

    if (!self.$data ||
      !self.$data.currentDataSets ||
      self.$data.currentDataSets.length === 0
    ) {
      self.$data.initialDataLoaded = false;
    }

    // Fetch collected Data
    var data = new Data('foooobar');
    self.currentDataSets = data.getAllDataSets(function (currentDataSets) {
      self.$data.initialDataLoaded = true;
      self.$data.currentDataSets = currentDataSets;
    });
  }
};
