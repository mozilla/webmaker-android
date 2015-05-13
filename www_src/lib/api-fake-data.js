var data = {
  'foo0': {
    id: 'foo0',
    coords: {x: 0, y: 0},
    style: {
      backgroundColor: '#F0CF62'
    },
    elements: [
      {
        id: 'barimage',
        type: 'image',
        attributes: {
          alt: 'This is Tucker',
          src: '../../img/toucan.svg',
          parentHeight: 440,
          parentWidth: 320,
        },
        styles: {
          angle: 0.02,
          scale: 0.75,
          x: 51,
          xoffset: -10,
          y: 118,
          yoffset: -21.5,
          zIndex: 1,
          opacity: 0.5
        }
      },
      {
        id: 'barlink',
        type: 'link',
        attributes: {
          href: 'https://mozilla.org',
          innerHTML: 'mozilla',
          parentHeight: 440,
          parentWidth: 320
        },
        styles: {
          angle: -0.05,
          scale: 1,
          x: 100,
          xoffset: 0,
          y: 50,
          yoffset: 0,
          zIndex: 3,
          opacity: 0.5
        }
      },
      {
        id: 'bartext',
        innerHTML: 'Hello world',
        type: 'text',
        attributes: {
          parentHeight: 440,
          parentWidth: 320,
        },
        styles: {
          angle: 0,
          scale: 1,
          x: 50,
          xoffset: 0,
          y: 350,
          yoffset: 0,
          zIndex: 2,
          opacity: 0.5
        }
      }
    ]
  },
  'foo1': {
    id: 'foo1',
    coords: {x: 0, y: -1},
    style: {
      backgroundColor: '#F0CF62'
    },
    elements: []
  },
  'foo2': {
    id: 'foo2',
    coords: {x: -1, y: 0},
    style: {
      backgroundColor: '#F0CF62'
    },
    elements: []
  },
  'foo3': {
    id: 'foo3',
    coords: {x: 1, y: 0},
    style: {
      backgroundColor: '#F0CF62'
    },
    elements: []
  },
  'foo4': {
    id: 'foo4',
    coords: {x: 0, y: 1},
    style: {
      backgroundColor: '#F0CF62'
    },
    elements: []
  },
  'foo5': {
    id: 'foo5',
    coords: {x: 0, y: 2},
    style: {
      backgroundColor: '#F0CF62'
    },
    elements: []
  },
  'foo6': {
    id: 'foo6',
    coords: {x: 2, y: 0},
    style: {
      backgroundColor: '#F0CF62'
    },
    elements: []
  }
};
window.fakeData = data;
module.exports = data;
