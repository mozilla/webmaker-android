module.exports = {
  focusNextInputByTabIndex: function () {
    var current = document.activeElement;
    var elements = document.getElementsByTagName('input');
    var idx = parseInt(current.getAttribute('tabIndex'), 10) + 1;

    for (var i = 0; i < elements.length; i++) {
      var t = parseInt(elements[i].getAttribute('tabIndex'), 10);
      if (t === idx) {
        elements[i].focus();
      }
    }
  }
};
