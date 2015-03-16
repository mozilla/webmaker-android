var ua = require('../../lib/ua');

module.exports = {
  className: 'image-editor',
  template: require('./index.html'),
  methods: {
    getImage: function (e, sourceType) {
      var self = this;
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      this.$data.inProgress = true;

      function onSuccess(imageData) {
        var prefix = 'data:image/jpeg;base64,';
        var test = 'data:image';
        // Android implementation doesn't add prefix
        if (imageData.indexOf(test) === -1) {
          imageData = prefix + imageData;
        }
        self.$data.inProgress = false;
        self.$dispatch('imagePicked', imageData);
      }

      function onFail(message) {
        console.log('Failed because: ' + message);
        self.$data.inProgress = false;
      }
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        targetWidth: 640,
        destinationType: window.Camera.DestinationType.DATA_URL,
        sourceType: window.Camera.PictureSourceType[sourceType]
      });
    }
  },
  data: {
    showEditor: false,
    inProgress: false
  },
  ready: function () {
    var self = this;
    this.$on('openImagePicker', function () {
      if (ua.isFirefoxOS) {
        self.getImage(null, 0);
      } else {
        self.$data.showEditor = true;
      }
    });
    this.$on('closeImagePicker', function () {
      self.$data.showEditor = false;
    });
  }
};
