module.exports = {
    className: 'image-editor',
    template: require('./index.html'),
    methods: {
        getImage: function (e, sourceType) {
            var self = this;
            e.preventDefault();
            e.stopPropagation();
            this.$data.inProgress = true;
            function onSuccess(imageData) {
                var prefix = 'data:image/jpeg;base64,';
                // Android implementation doesn't add prefix
                if (imageData.indexOf(prefix) === -1) {
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
                targetWidth: 320,
                targetHeight: 240,
                destinationType: window.Camera.DestinationType.DATA_URL,
                sourceType: window.Camera.PictureSourceType[sourceType]
            });
        },
        openEditor: function (e) {
            e.preventDefault();
            this.$data.inProgress = false;
        },
        cancelEditor: function (e) {
            e.preventDefault();
            this.$data.inProgress = false;
        }
    },
    data: {}
};
