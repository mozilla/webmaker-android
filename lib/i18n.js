/**
 * Localization!
 *
 */
var model = require('./model')();

// Spoof because navigator.language sucks
function getLocaleFromQueryString() {
    var regex = new RegExp('[\\?&]locale=([^&#]*)');
    var results = regex.exec(window.location.search);

    if (results === null) {
        return '';
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
}

function Localize () {
    var self = this;

    self.defaultLang = 'en-US';
    self.locale = navigator.language;

    self.dictionary =  {};
    self.dictionaries = {};
    self.url = '';

    self.bind = function (langs, vue) {

        self.dictionaries = langs;

        // Bind directives/filters
        if (vue) {
            vue.filter('i18n', self.i18nFilter);
            vue.directive('bind-i18n-html', self.bindHtml);
        }
    };

    self.setLocale = function (locale, autodetect) {
        var html = window.document.querySelector('html');

        // Try to autodetect locale
        if (autodetect) {
            var defaultLang = self.defaultLang;
            var navLocale = navigator.language;
            var spoof = getLocaleFromQueryString();
            self.locale = spoof || locale || navLocale || defaultLang;
            model.locale = self.locale;
        }

        // Set dictionary
        var currentLangDict = self.dictionaries[model.locale];
        var defaultLangDict = self.dictionaries[self.defaultLang];
        self.dictionary = currentLangDict || defaultLangDict;

        if (html) {
            html.setAttribute('lang', model.locale);
        }

    };

    self.get = function (key) {
        var dict = self.dictionary[key];
        var defaultLang = self.dictionaries[self.defaultLang][key];
        if (self.dictionaries[self.locale] !== undefined) {
            return self.dictionaries[self.locale][key];
        }
        return dict || defaultLang || key;
    };

    self.i18nFilter = function (key) {
        return self.get(key);
    };

    self.bindHtml = function (key) {
        var raw = self.get(key);
        this.el.innerHTML = raw;
    };
}

module.exports = new Localize();
