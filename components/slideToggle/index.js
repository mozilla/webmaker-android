module.exports = {
    id: 'slideToggle',
    template: require('./index.html'),
    ready : function(){
      var that = this;
      this.direction = "left";
      this.leftOption = this.$el.getAttribute("left") || "left";
      this.rightOption = this.$el.getAttribute("right") || "right";
      this.updateUI();
    },
    toggleSettings : {
      left : "blam",
      right : "jam"
    },
    methods: {
      updateUI : function(){
        if(this.direction === "left"){
          this.currentOption = this.leftOption;
        } else {
          this.currentOption = this.rightOption;
        }
      },
      onClick: function (e) {
        this.direction = e.target.getAttribute("data-direction");
        var event = new Event('toggleChange', {
            'details' : {
              toggleName : 'jam',
              selectedOption: this.direction
            },
            'bubbles': true,
            'cancelable': true
        });
        window.dispatchEvent(event);
        console.log(event);
        this.updateUI();
      }
    }
};
