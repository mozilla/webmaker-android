module.exports = {
    // Converts object to array
    // If the values are objects, idKey (default _key) is the key
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
    }
};
