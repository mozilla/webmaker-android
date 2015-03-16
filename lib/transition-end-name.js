// Return the name of the current browser's transition end event
module.exports = function () {
  var i;
  var el = document.createElement('div');

  var transitions = {
    transition: 'transitionend',
    OTransition: 'otransitionend', // oTransitionEnd in very old Opera
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  };

  for (i in transitions) {
    if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
      return transitions[i];
    }
  }
};
