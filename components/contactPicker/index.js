module.exports = {
    className: 'contact-picker',
    template: require('./index.html'),
    ready: function () {
        this.$on('openContactPicker', function (event) {
            this.show = true;
        });

        this.modelData();
    },
    methods: {
        onSave: function (e) {
            this.show = false;
        },
        onCancel: function (e) {
            this.selectedColor = this.originalColor;
            this.show = false;
        },
        modelData: function () {
            var modeled = {};

            // Sort contacts into alphabetical order
            this.contacts = this.contacts.sort(function (a, b) {
                return a.name > b.name;
            });

            // Create an object with alpha-keys to group by first name
            this.contacts.forEach(function (contact) {
                var firstLetter = contact.name[0].toUpperCase();

                if (!modeled[firstLetter]) {
                    modeled[firstLetter] = [];
                }

                modeled[firstLetter].push(contact);
            });

            this.modeledContacts = modeled;
        }
    },
    data: {
        contacts: [
            {
                name: 'Bob Bobbington',
                number: 1235433333
            },
            {
                name: 'Eoo Eoobington',
                number: 1235433333
            },
            {
                name: 'M Mbington',
                number: 1235433333
            },
            {
                name: 'Dude Bobbington',
                number: 1235433333
            },
            {
                name: 'earl Earlbington',
                number: 1235433333
            },
            {
                name: 'Joe Joebington',
                number: 1235433333
            },
            {
                name: 'Frank Frankbington',
                number: 1235433333
            }
        ]
    }
};
