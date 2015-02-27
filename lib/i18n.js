/**
 * Localization!
 *
 */
var model = require('./model')();
// locale that we want to alias
var localeAliases = {
    "bn": "bn-BD",
    "bn-IN": "bn-BD",
    "hi": "hi-IN",
    "fr-FR": "fr",
    "fr-CA": "fr",
    "fr-BE": "fr"
};
function aliasLocale (locale) {
    if (locale in localeAliases) {
        return localeAliases[locale];
    } else {
        return locale;
    }
}

function Localize () {

    var self = this;


    self.defaultLang = 'en-US';
    self.locale = navigator.language;
    self.locale = aliasLocale(self.locale);
    self.supportedLanguages = [];
    self.dictionary =  {};
    self.dictionaries = {};
    self.url = '';

    self.bind = function (langs, vue) {

        self.dictionaries = langs;
        for (var locale in langs) {
            if (locale) {
                self.supportedLanguages.push(locale);
            }
        }

        // Bind directives/filters
        if (vue) {
            vue.filter('i18n', self.i18nFilter);
            vue.directive('bind-i18n-html', self.bindHtml);
        }
    };


    self.supportedLangs = function () {
        return this.supportedLanguages;
    };

    self.setLocale = function (locale, autodetect) {
        var html = window.document.querySelector('html');
        locale = aliasLocale(locale);
        // Try to autodetect locale
        if (autodetect) {
            var defaultLang = self.defaultLang;
            self.locale = locale || self.locale || defaultLang;
            model.data.session.locale = self.locale;
        }

        // Set dictionary
        var currentLangDict = self.dictionaries[model.data.session.locale];
        var defaultLangDict = self.dictionaries[self.defaultLang];
        self.dictionary = currentLangDict || defaultLangDict;

        if (html) {
            html.setAttribute('lang', model.data.session.locale);
        }

    };

    self.get = function (key) {
        var dict = self.dictionary[key];
        var defaultLang = self.dictionaries[self.defaultLang][key];
        if (self.dictionaries[model.data.session.locale] !== undefined) {
            var localized = self.dictionaries[model.data.session.locale][key];
            if (!!localized) {
                return localized;
            }
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
