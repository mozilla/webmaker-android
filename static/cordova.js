// This is a stand-in for the real cordova code, so that this code-base can
// still run in a web browser;

// todo: shim as needed
// https://github.com/apache/cordova-plugin-contacts/blob/master/doc/index.md
navigator.contacts = {
    create: function () {},
    find: function () {},
    pickContact: function () {}
};
