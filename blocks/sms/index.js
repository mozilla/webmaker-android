module.exports = {
  className: 'sms',
  template: require('./index.html'),
  data: {
    name: 'SMS',
    icon: 'images/blocks_sms.png',
    attributes: {
      value: {
        label: 'Phone #',
        type: 'string',
        value: '+18005555555'
      },
      messageBody: {
        label: 'Message',
        type: 'string',
        value: ''
      },
      innerHTML: {
        label: 'Label',
        type: 'string',
        value: 'Send SMS'
      },
      color: {
        label: 'Button Color',
        type: 'color',
        value: '#64A8EE',
        skipAutoRender: true
      }
    }
  },
  methods: {
    onClick: function (e) {
      e.preventDefault();
      var attr = this.$data.attributes;
      var number = attr.value.value;
      var body = attr.messageBody.value;
      window.location = 'sms:' + number + '?body=' + body;
    }
  }
};
