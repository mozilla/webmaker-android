module.exports = {
  jsonToFormEncoded: function (json) {
    if (!json) {
      return;
    }
    return Object.keys(json).map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    }).join('&');
  },
  parseJSON: function (string) {
    var result = {};
    if (string && typeof string === 'object') {
      return string;
    }
    if (string && typeof string === 'string') {
      try { result = JSON.parse(string); } catch (e) {}
    }
    return result;
  }
};
