module.exports = {
    // Converts object to array
    // If the values are objects, idKey (default _key) is the key

    //Base color set for colorpicker and icon app background
    baseColors: [
        '#3188D9',
        '#32ABDF',
        '#8C8DE8',
        '#A6BECD',
        '#FC5D5E',
        '#98CA47',
        '#3CE0B1',
        '#F5913E',
        '#F1C143',
        '#FEE444'
    ],

    toArray: function (obj, idKey) {
        if (idKey !== false) {
            idKey = idKey || '__key';
        }
        return Object.keys(obj).map(function (key) {
            var val = obj[key];
            if (val && idKey && typeof val === 'object') {
                val[idKey] = key;
            }
            return val;
        });
    },

    // Returns index of an object in arr containing key and val
    findInArray: function (arr, key, val) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i][key] === val) {
                return i;
            }
        }
    },
    // Note: all colors are outputted as lowercase hex.
    shadeColor: function (color, percent) {
        /* jshint ignore:start */
        // jscs:disable
        var num = parseInt(color.slice(1), 16);
        var amt = Math.round(2.55 * percent);
        var R = (num >> 16) + amt;
        var G = (num >> 8 & 0x00FF) + amt;
        var B = (num & 0x0000FF) + amt;

        return ('#' + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1)).toLowerCase();
        /* jshint ignore:end */
        // jscs:enable
    },

    simpleObjectMerge: function (obj1, obj2) {
        var finalobj = {};
        for (var i = 0; i < obj1.length; i++) {
            obj1[i];
        }
        Object.keys(obj1).forEach(function (key) {
            finalobj[key] = obj1[key];
        });

        Object.keys(obj2).forEach(function (key) {
            finalobj[key] = obj2[key];
        });
        return finalobj;
    },

    toParameterString: function (obj) {
        var s = '';
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            s += keys[i];
            s += '=';
            s += obj[ keys[i] ];
            if (i !== keys.length - 1) {
                s += '&';
            }
        }
        return s;
    },
    openInBrowser: function (e) {
        // forces app to open a link in native browser.
        // el syntax: <a href="[desired url]" v-on="click: openInBrowser">
        e.preventDefault();
        window.open(e.target.href, '_system');
        return false;
    }
};
