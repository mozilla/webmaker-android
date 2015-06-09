var {jsonToFormEncoded, parseJSON} = require('../lib/jsonUtils');
var should = require('should');

describe('jsonUtils', function () {

  describe('#jsonToFormEncoded', function () {
    [
      [
        {foo: 'bar'},
        'foo=bar'
      ],
      [
        {foo: 'bar', bar: 'baz'},
        'foo=bar&bar=baz'
      ],
      [
        {a: 'a@b.com', 'f_%2': 'b'},
        'a=a%40b.com&f_%252=b'
      ]
    ].forEach(test => {
      it(`should convert ${JSON.stringify(test[0])}`, function () {
        should(jsonToFormEncoded(test[0])).equal(test[1]);
      });
    });
  });

  describe('#parseJson', function () {
    [
      [
        {foo: 'bar'},
        {foo: 'bar'}
      ],
      [
        '{"foo": "bar"}',
        {foo: 'bar'}
      ],
      [
        undefined,
        {}
      ],
      [
        null,
        {}
      ],
      [
        '',
        {}
      ],
      [
        'fooinvalid',
        {}
      ]
    ].forEach(test => {
      it(`should convert ${typeof test[0] === 'object' ? JSON.stringify(test[0]) : test[0]}`, function () {
        should.deepEqual(parseJSON(test[0]), (test[1]));
      });
    });
  });

});
