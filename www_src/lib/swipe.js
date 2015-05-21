module.exports = function calculateSwipe(startX, startY, endX, endY) {
  var THRESHOLD = 100;
  var MINIMUM_DISTANCE = 50;

  var distance = Math.sqrt(Math.pow(startX - endX, 2) + Math.pow(startY - endY, 2));

  if (distance >= MINIMUM_DISTANCE) {
    if (startX > endX && Math.abs(startY - endY) < THRESHOLD) {
      return('LEFT');
    } else if (startX < endX && Math.abs(startY - endY) < THRESHOLD) {
      return('RIGHT');
    } else if (startY < endY && Math.abs(startX - endX) < THRESHOLD) {
      return('DOWN');
    } else if (startY > endY && Math.abs(startX - endX) < THRESHOLD) {
      return('UP');
    }
  } else {
    return false;
  }
};
