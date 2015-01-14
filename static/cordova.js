// This is a stand-in for the real cordova code, so that this code-base can
// still run in a web browser;
(function () {
    var fakeContacts = [
        ['Kate Hudson', '(416) 852-6445'],
        ['Adam B', '1 232-852-6445'],
        ['Barney Roberts', '1 123-2134'],
        ['Aisha H', '1 412 923-1938'],
        [null, null],
        ['Mariam Z', '(320) 230-1230'],
        ['Zarah P', '1 512 899 9997']
    ].map(function (data, i) {
        return {
            id: i + '',
            displayName: data[0],
            phoneNumbers: [
                {
                    id: i,
                    pref: false,
                    type: 'mobile',
                    value: data[1]
                }
            ]
        }
    });

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
