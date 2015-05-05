var uuid = require('../../lib/uuid');
var els = [
  {
    id: 'foo0',
    coords: {x: 0, y: 0},
    style: {
      backgroundColor: '#BC3B20'
    },
    elements: []
  },
  {
    id: 'foo1',
    coords: {x: 0, y: -1},
    style: {
      backgroundColor: '#EBC4BB'
    },
    elements: []
  },
  {
    id: 'foo2',
    coords: {x: -1, y: 0},
    style: {
      backgroundColor: '#AABDD6'
    },
    elements: []
  },
  {
    id: 'foo3',
    coords: {x: 1, y: 0},
    style: {
      backgroundColor: '#DF465E'
    },
    elements: []
  },
  {
    id: 'foo4',
    coords: {x: 0, y: 1},
    style: {
      backgroundColor: '#F0CF62'
    },
    elements: []
  },
  {
    id: 'foo5',
    coords: {x: 0, y: 2},
    style: {
      backgroundColor: '#6ADBD5'
    },
    elements: []
  },
  {
    id: 'foo6',
    coords: {x: 2, y: 0},
    style: {
      backgroundColor: '#923574'
    },
    elements: []
  }
];

module.exports = {
  getPages: function (options, cb) {
    var res = JSON.parse(JSON.stringify(els));
    setTimeout(function () {
      cb(null, res);
    }, 1000);
  },
  getPage: function (id, cb) {
    var index;
    els.forEach((el, i) => {
      if (el.id === this.state.selectedEl) index = i;
    });
    setTimeout(function () {
      cb(null, JSON.parse(JSON.stringify(els[index])));
    }, 1000);
  },
  createPage: function (options, cb) {
    var newEl = JSON.parse(JSON.stringify(options));
    newEl.id = uuid();
    els.push(newEl);
    setTimeout(function () {
      cb(null, JSON.parse(JSON.stringify(newEl)));
    }, 10);
  },
  removePage: function (id, cb) {
    var index;
    els.forEach((el, i) => {
      if (el.id === this.state.selectedEl) index = i;
    });
    if (!index)  {
      cb(new Error('There was no element with that id'));
    } else {
      els.splice(index, 1);
      setTimeout(function () {
        cb(null);
      }, 10);
    }
  }
};
