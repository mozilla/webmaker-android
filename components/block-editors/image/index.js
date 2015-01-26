module.exports = {
    id: 'image-editor',
    template: require('./index.html'),
    methods: {
        getUrl: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.$data.showUrlInput = true;
            this.$data.editorOpen = false;
        },
        getImage: function (e, sourceType) {
            var self = this;
            e.preventDefault();
            e.stopPropagation();
            function onSuccess(imageData) {
                self.$data.value = 'data:image/jpeg;base64,' + imageData;
                self.$data.showUrlInput = false;
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
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType[sourceType]
            });
        },
        openEditor: function (e) {
            e.preventDefault();
            this.$data.editorOpen = true;
        },
        cancelEditor: function (e) {
            e.preventDefault();
            this.$data.editorOpen = false;
        },
        onUpdateUrl: function (e) {
            this.$data.value = this.$data.imageUrl;
        }
    },
    data: {},
    ready: function () {
        if (this.$data.value && !this.$data.value.match('data:image/jpeg;base64')) {
            this.$data.imageUrl = this.$data.value;
        }
    }
};
