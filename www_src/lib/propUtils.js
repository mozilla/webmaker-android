var utils = {};

utils.propsToPosition = function (props) {
  return {
    position:'absolute',
    top: 0,
    left: 0,
    transform: [
      'translate('+(props.x + props.xoffset)+'px, '+(props.y + props.yoffset)+'px)',
      'rotate('+(props.angle * 180/Math.PI)+'deg)',
      'scale('+props.scale+')'
    ].join(' '),
    transformOrigin: 'center',
    zIndex: props.zIndex
  };
};

module.exports = utils;
