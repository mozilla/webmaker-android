class Cartesian {

  constructor(options) {
    options = options || {};
    if (!options.height || !options.width || !options.allCoords) {
      throw new Error('You must configure height, width, allCoords');
    }
    this.width = options.width;
    this.height = options.height;
    this.gutter = options.gutter || 0;
    this.allCoords = options.allCoords;
  }

  get edges() {
    return this.getEdges();
  }

  // Includes edges.
  get all() {
    return this.allCoords.concat(this.edges);
  }

  get allX() {
    return this.all.map(xy => xy.x);
  }
  get allY() {
    return this.all.map(xy => xy.y);
  }
  get widthPadded() {
    return this.width + this.gutter;
  }
  get heightPadded() {
    return this.height + this.gutter;
  }

  // Calculate absolute distance from 0 to min/max
  getAbsDistance(xOrY, maxOrMin) {
    var isX = xOrY === 'x';

    var allValues = isX ? this.allX : this.allY;
    var distance = isX ? this.widthPadded : this.heightPadded;

    var difference = Math.abs(Math[maxOrMin].apply(null, allValues));

    return distance * difference + 'px';
  }

  // Creates a css transform based on x and y coordinates.
  // getTransform(Object coords) => String transformString
  //    coords: coordinates of an element e.g. {x: 0, y: 1}
  //    transformString: e.g. 'translate(20px, 30px)'
  getTransform(coords) {

    var translateX = coords.x * this.widthPadded;
    var translateY = coords.y * this.heightPadded;

    return `translate(${translateX}px, ${translateY}px)`;
  }

  // Calculates the smallest possible dimensions of a rectangle given some coordinates
  // getBoundingSize(Array coordSet) => Object boundingStyles
  //    coordSet: an array of coordinates of all elements. e.g. [{x: 0, y: 0}, {x: 1, y: -1}]
  getBoundingSize() {

    var x = this.allX;
    var y = this.allY;

    // Note: we need to 2 to account for "add page" buttons on the edges
    var diffX = Math.max.apply(null, x) - Math.min.apply(null, x);
    var diffY = Math.max.apply(null, y) - Math.min.apply(null, y);

    return {
      width: this.width + 'px',
      height: this.height + 'px',
      paddingTop: this.getAbsDistance('y', 'min'),
      paddingRight: this.getAbsDistance('x', 'max'),
      paddingBottom: this.getAbsDistance('y', 'max'),
      paddingLeft: this.getAbsDistance('x', 'min'),
      marginLeft: -((diffX * this.widthPadded + this.width) / 2) + 'px',
      marginTop: -((diffY * this.heightPadded + this.height) / 2) + 'px',
    };
  }

  // Calculates the transform on the outer bounding box to center the currently selected element
  // getFocusTransform(Object coords) => Object translation
  //    coords: e.g [0, -1]
  //    translation: the translation in px e.g. {x: -100, y: 200}
  getFocusTransform(coords, zoom) {
    zoom = zoom || 1;

    var x = this.allX;
    var y = this.allY;

    var midX = (Math.max.apply(null, x) + Math.min.apply(null, x)) / 2;
    var midY = (Math.max.apply(null, y) + Math.min.apply(null, y)) / 2;

    var translateX = (midX - coords.x) * this.widthPadded * zoom;
    var translateY = (midY - coords.y) * this.heightPadded * zoom;

    return {
      x: translateX,
      y: translateY
    };
  }

  // Find coordinates of all edges, that is the empty areas around the grid
  // getEdges() => Array coords
  getEdges() {
    var result = [];
    var allStr = this.allCoords.map(coords => `${coords.x}/${coords.y}`);
    this.allCoords.forEach(coords => {
      var {x, y} = coords;
      [
        {x: x - 1, y},
        {x: x + 1, y},
        {x, y: y - 1},
        {x, y: y + 1}
      ].map(coords => `${coords.x}/${coords.y}`)
        .forEach((coordString, i) => {
          if (allStr.indexOf(coordString) < 0 && result.indexOf(coordString) < 0) {
            result.push(coordString);
          }
        });
    });
    return result.map(coords => {
      coords = coords.split('/');
      return {
        x: parseInt(coords[0], 10),
        y: parseInt(coords[1], 10)
      };
    });
  }

}

module.exports = Cartesian;
