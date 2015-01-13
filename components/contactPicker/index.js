var clone = require('clone');

module.exports = {
    className: 'contact-picker',
    template: require('./index.html'),
    ready: function () {
        this.modelData();

        this.$on('openContactPicker', function (event) {
            this.open();
        });

        // TODO - Replace mock data with real contacts:

        // navigator.contacts.find(['*'],
        //     onSuccess function(contacts),
        //     onError function(error));
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
            this.close();
        },
        onCancel: function (e) {
            this.modeledContacts = this.initialState;
            this.close();
        },
        modelData: function () {
            var modeled = {};

            // Sort contacts into alphabetical order
            this.contacts = this.contacts.sort(function (a, b) {
                return a.displayName > b.displayName;
            });

            // Create an object with alpha-keys to group by first name
            this.contacts.forEach(function (contact) {
                var firstLetter = contact.displayName[0].toUpperCase();

                if (!modeled[firstLetter]) {
                    modeled[firstLetter] = [];
                }

                contact.$add('selected', false);

                modeled[firstLetter].push(contact);
            });

            this.modeledContacts = modeled;
        }
    },
    data: {
        contacts: [
            {
                id: '1',
                displayName: 'Kate Hudson',
                phoneNumbers: [
                    {
                        id: '1',
                        pref: false,
                        type: 'mobile',
                        value: '(416) 852-6445'
                    }
                ]
            },
            {
                id: '2',
                displayName: 'Adam B',
                phoneNumbers: [
                    {
                        id: '3',
                        pref: false,
                        type: 'mobile',
                        value: '1 232-852-6445'
                    }
                ]
            }
        ]
    }
};
