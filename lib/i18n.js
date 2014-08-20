/**
 * Localization!
 *
 */
var Vue = require('vue');

function Localize () {
    var self = this;

    self.defaultLang = 'en-US';

    self.currentLang = '';
    self.dictionary =  {};
    self.dictionaries = {};
    self.url = '';

    self.addLanguage = function (locale, strings) {
        self.dictionaries[locale] = strings;
    };

    self.ready = function () {
        var html = document.querySelector('html');
        self.currentLang = navigator.language || navigator.userLanguage || self.defaultLang;
        self.dictionary = self.dictionaries[self.currentLang] || self.dictionaries[self.defaultLang];
        if (html) {
            html.setAttribute('lang', self.currentLang);
        }
    };

    self.get = function (key) {
        return self.dictionary[key] || key;
    };

    self.gettext = function (key) {
        return self.get(key);
    };

    self.bindHtml = {
        update: function (key) {
            var compiler = this.compiler;
            this.el.innerHTML = compiler.compile(key);
        }
    };
}

module.exports = new Localize();
