var clone = require('clone');

module.exports = {
  className: 'contact-picker',
  template: require('./index.html'),
  ready: function () {
    var self = this;

    navigator.contacts.find(['*'], function (contacts) {
      self.$data.contacts = contacts;
      self.modelData();
    }, function (err) {
      console.log(err);
    });

    self.$on('openContactPicker', function (event) {
      self.open();
    });
  },
  methods: {
    open: function () {
      // Store a copy of intial contact data in case user doesn't save
      this.initialState = clone(this.modeledContacts);
      this.show = true;
    },
    close: function () {
      this.show = false;
    },
    onSave: function (e) {
      // TODO: Do something with selected contacts
      this.close();
    },
    onCancel: function (e) {
      this.modeledContacts = this.initialState;
      this.close();
    },
    modelData: function () {
      var modeled = {};

      // Sort contacts into alphabetical order
      this.contacts = this.contacts
        .filter(function (contact) {
          if (!contact ||
            !contact.displayName ||
            !contact.phoneNumbers ||
            !contact.phoneNumbers.length ||
            !contact.phoneNumbers[0].value) {
            return false;
          } else {
            return true;
          }
        })
        .sort(function (a, b) {
          return a.displayName > b.displayName;
        });

      // Create an object with alpha-keys to group by first name
      this.contacts.forEach(function (contact, i) {
        var firstLetter = contact.displayName[0].toUpperCase();

        if (!modeled[firstLetter]) {
          modeled[firstLetter] = [];
        }

        contact.$add('selected', false);

        modeled[firstLetter].push(contact);
      });

      this.modeledContacts = modeled;
    }
  }
};
