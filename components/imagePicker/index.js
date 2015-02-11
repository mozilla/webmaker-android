module.exports = {
    className: 'image-editor',
    template: require('./index.html'),
    methods: {
        getImage: function (e, sourceType) {
            var self = this;
            e.preventDefault();
            e.stopPropagation();
            function onSuccess(imageData) {
                var uri = 'data:image/jpeg;base64,' + imageData;
                self.$dispatch('imagePicked', uri);
                self.$data.editorOpen = false;
            }
            function onFail(message) {
                console.log('Failed because: ' + message);
                self.$data.editorOpen = false;
            }
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 20,
                targetWidth: 320,
                targetHeight: 240,
                destinationType: window.Camera.DestinationType.DATA_URL,
                sourceType: window.Camera.PictureSourceType[sourceType]
            });
        },
        openEditor: function (e) {
            e.preventDefault();
            this.$data.editorOpen = true;
        },
        cancelEditor: function (e) {
            e.preventDefault();
            this.$data.editorOpen = false;
        }
    },
    data: {}
};
