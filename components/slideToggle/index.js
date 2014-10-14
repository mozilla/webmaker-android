module.exports = {
    id: 'slideToggle',
    template: require('./index.html'),
    ready : function(){
      console.log(this.$el);
    },
    methods: {
      onClick: function (e) {
        console.log("hi");
        this.$el.className = 'left';
      }
    }
};
