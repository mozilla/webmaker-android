var publishEndpoint = 'http://webmaker-app-publisher.mofodev.net/publish';
//var publishEndpoint = 'http://localhost:1234/publish';

module.exports = function (id, cb) {

    var http = new XMLHttpRequest();
    var body = JSON.stringify({id: id});

    http.open('POST', publishEndpoint, true);
    http.withCredentials = true;
    http.setRequestHeader('Content-Type', 'application/json');

    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200) {
        var data = JSON.parse(http.responseText);
        cb(null, data);
      }

      else if (http.readyState === 4 && http.status && (http.status >= 400 || http.status < 200)) {
        cb({ error: http.responseText });
      }

      else if (http.readyState === 4) {
        cb({ error: 'Looks like ' + publishEndpoint + ' is not responding...' });
      }

    };

    http.send(body);

};
