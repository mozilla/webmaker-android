// This is a stand-in for the real cordova code, so that this code-base can
// still run in a web browser;
(function () {
    var fakeContacts = [
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
    ];

    // https://github.com/apache/cordova-plugin-contacts/blob/master/doc/index.md
    navigator.contacts = navigator.contacts || {
        create: function () {},
        find: function (fields, onSuccess, onError) {
            // fields must be an array. to return all, use ['*']
            onSuccess(fakeContacts);
        },
        pickContact: function () {}
    };

})();
