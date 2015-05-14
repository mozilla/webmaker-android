var React = require('react');
var render = require('../../lib/render.jsx');
var xhr = require('xhr');
var Image = require('../../blocks/image.jsx');

function parse(string) {
  try {
    return JSON.parse(string);
  } catch (e) {
    return null;
  }
}

var user = 1;
var token = 'validToken';

function api(options, callback) {
  var BASE_URL = 'https://webmaker-api.herokuapp.com';
  options.uri = `${BASE_URL}/users/${user}${options.uri}`;
  xhr(options, (err, resp, body) => {
    if (typeof body === 'string') body = parse(body);
    if (err) return callback(err, body);
    callback(null, body);

  });

}

var ApiTest = React.createClass({
  render: function () {
    // // GET
    // api({uri: '/projects/1'}, function (err, data) {
    //   console.log(err, data);
    // });
    // // GET: empty
    // api({uri: '/projects/23012'}, function (err, data) {
    //   console.log(err, data);
    // });
    // // POST: unauthorized
    // api({method: 'post', uri: '/projects', json: {}}, function (err, data) {
    //   console.log(err, data);
    // });
    // POST: authorized

    // api({
    //   method: 'delete',
    //   uri: '/projects/21'
    //   headers: {
    //     Authorization: 'token ' + token
    //   }
    // }, function (err, data) {
    //   console.log('post deleted', err, data);
    // });

    // api({
    //   method: 'post',
    //   uri: '/projects',
    //   json: {
    //     title: 'My awesome project',
    //     thumbnail: {'400': 'https://example.com/400.png'}
    //   },
    //   headers: {
    //     Authorization: 'token ' + token
    //   }
    // }, function (err, data) {
    //   console.log('post authorized', err, data);
    //   id = data.project.id;
    //   console.log('/projects/' + id);
    // });


    return (<div>
        <Image src="http://cdn.playbuzz.com/cdn/0079c830-3406-4c05-a5c1-bc43e8f01479/8c7524f9-b5f9-4ff6-8878-b6ed1a4085f5_560_420.jpg" />
    </div>);
  }
});

render(ApiTest);
