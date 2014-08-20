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

    self.bind = function (langs, vue) {
        var html = document.querySelector('html');
        self.dictionaries = langs;
        self.currentLang = navigator.language || navigator.userLanguage || self.defaultLang;
        console.log(navigator.language);
        self.dictionary = self. dictionaries[self.currentLang] || self.dictionaries[self.defaultLang];
        if (html) {
            html.setAttribute('lang', self.currentLang);
        }

        // Bind directives/filters
        if (vue) {
            vue.filter('i18n', self.i18nFilter);
            vue.directive('bind-html', self.bindHtml);
        }
    };

    self.get = function (key) {
        return self.dictionary[key] || self.dictionaries[self.defaultLang][key] || key;
    };

    self.i18nFilter = function (key) {
        return self.get(key);
    };

    self.bindHtml = function (key) {
        var raw = self.get(key);
        var compiler = this.compiler;
        this.el.innerHTML = raw;
    };
}

module.exports = new Localize();
