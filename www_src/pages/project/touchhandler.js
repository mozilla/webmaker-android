module.exports = function(positionable) {
  return {
    startmark: function(evt) {
      positionable.transform = JSON.parse(JSON.stringify(positionable.state));
      positionable.transform.markx = evt.clientX || evt.touches[0].pageX;
      positionable.transform.marky = evt.clientY || evt.touches[0].pageY;
      positionable.setState({ touchactive: true });
      if(evt.touches && evt.touches.length > 1) { secondFinger(evt); }
      evt.preventDefault();
      evt.stopPropagation();
    },
    panmove: function(evt) {
      if (!positionable.state.touchactive) return;
      if (evt.touches && evt.touches.length > 1) {
        return this.secondFinger(evt);
      }
      var x = evt.clientX || evt.touches[0].pageX,
          y = evt.clientY || evt.touches[0].pageY;
      positionable.handleTranslation(
        x - positionable.transform.markx,
        y - positionable.transform.marky
      );
    },
    endmark: function(evt) {
      if (positionable.state.touchactive) {
        positionable.transform = false;
        positionable.setState({ touchactive: false });
      }
    },
    secondFinger: function(evt) {
      if (evt.touches.length < 2) return;
      positionable.transform.markx2 = evt.touches[1].pageX;
      positionable.transform.marky2 = evt.touches[1].pageY;
      var x1 = positionable.transform.markx,
          y1 = positionable.transform.marky,
          x2 = positionable.transform.markx2,
          y2 = positionable.transform.marky2,
          dx = x2 - x1,
          dy = y2 - y1,
          d = Math.sqrt(dx*dx + dy*dy),
          a = Math.atan2(dy,dx);
      positionable.transform.markdist = d;
      positionable.transform.markangle = a;
      evt.preventDefault();
      evt.stopPropagation();
    },
    handleRS: function(evt) {
      if (evt.touches.length < 2) return;
      var x1 = positionable.transform.markx,
          y1 = positionable.transform.marky,
          x2 = evt.touches[1].pageX,
          y2 = evt.touches[1].pageY,
          dx = x2 - x1,
          dy = y2 - y1,
          d = Math.sqrt(dx*dx + dy*dy),
          da = Math.atan2(dy,dx) - positionable.transform.markangle,
          s = d/positionable.transform.markdist;
      positionable.handleRotationAndScale(da * 180/Math.PI, s);
    },
    endSecondFinger: function(evt) {
      positionable.transform.angle = positionable.state.angle;
      positionable.transform.scale = positionable.state.scale;
      positionable.transform.markx = evt.clientX || evt.touches[0].pageX;
      positionable.transform.marky = evt.clientY || evt.touches[0].pageY;
      evt.preventDefault();
      evt.stopPropagation();
    }
  };
};
