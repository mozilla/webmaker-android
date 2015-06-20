var should = require('should');
var React = require('react');
var Spec = require('../lib/spec');

function validSpec() {
  return {
    foo: {
      category: 'styles',
      validation: React.PropTypes.string,
      default: 'foo',
      editor: 'color'
    },
    bar: {
      category: 'attributes',
      validation: React.PropTypes.number,
      default: 0
    }
  };
}

describe('Spec', () => {

  it('should not throw for valid params', () => {
    should.doesNotThrow(() => {
      var s = new Spec('foo', validSpec());
    });
  });
  it('should throw if second param is not an object', () => {
    should.throws(() => {
      var s = new Spec('foo', 'foo');
    });
  });
  it('should throw if params are missing', () => {
    should.throws(() => {
      var s = new Spec();
    });
  });
  it('should throw if first param is not a string', () => {
    should.throws(() => {
      var s = new Spec({}, validSpec());
    });
  });
  it('should throw if second param is not an object', () => {
    should.throws(() => {
      var s = new Spec('foo', 'foo');
    });
  });

  describe('#getValidationErrors', () => {
    it('should not return an error for valid props', () => {
      var defn = validSpec();
      should.equal(Spec.getValidationErrors(defn), null);
    });
    it('should return error if spec is an empty object', () => {
      should.equal(Spec.getValidationErrors({}), 'Spec must have at least one prop');
    });
    it('should return an error if a prop has an invalid key', () => {
      var defn = validSpec();
      defn.foo.foo = 'foo';
      should.equal(Spec.getValidationErrors(defn), 'foo is not a valid key');
    });
    it('should return an error if a prop has an invalid category', () => {
      var defn = validSpec();
      defn.foo.category = 'style';
      should.equal(Spec.getValidationErrors(defn), 'style is not a valid category definition for foo');
    });
  });

  describe('#getPositionProps', () => {
    var props = Spec.getPositionProps();
    it('should return valid props', () => {
      should.equal(Spec.getValidationErrors(props), null);
    });
  });

  describe('#propsToPosition', () => {
    it('should return valid props', () => {
      should.deepEqual(Spec.propsToPosition({
        x: 50,
        y: -12,
        angle: 90 * Math.PI / 180,
        scale: 2.5,
        zIndex: 5
      }), {
        '-webkit-transform': 'translate(50px, -12px) rotate(90deg) scale(2.5)',
        transform: 'translate(50px, -12px) rotate(90deg) scale(2.5)',
        transformOrigin: 'center',
        zIndex: 5
      });
    });
  });

  describe('spec', () => {
    var s;

    beforeEach(()=> {
      s = new Spec('foo', {
        foo: {
          category: 'styles',
          validation: React.PropTypes.string,
          default: 'foo'
        },
        bar: {
          category: 'attributes',
          default: function () {
            return 0;
          }
        },
        baz: {
          category: 'attributes',
          validation: React.PropTypes.number
        }
      });
    });

    describe('#getDefaultProps', () => {
      it('should generate default props for props with non-function defaults', () => {
        should.deepEqual(s.getDefaultProps(), {
          foo: 'foo',
          bar: 0
        });
      });
      it('should generate call default generator functions when defined', () => {
        var s2 = new Spec('foo', {
          foo: {
            category: 'styles',
            validation: React.PropTypes.string,
            default: function () {
              return 'blah';
            }
          }
        });
        should.deepEqual(s2.getDefaultProps(), {
          foo: 'blah'
        });
      });
    });

    describe('#getPropTypes', () => {
      it('get validations for props with validations', () => {
        should.deepEqual(s.getPropTypes(), {
          foo: React.PropTypes.string,
          baz: React.PropTypes.number
        });
      })
    });

    describe('#flatten', () => {
      it('should return an empty object given an empty object or null', () => {
        should.deepEqual(s.flatten({}), {});
        should.deepEqual(s.flatten(null), {});
      });
      it('should flatten a list of props and not add defaults', () => {
        should.deepEqual(s.flatten({
          styles: {
            foo: 'faz'
          },
          attributes: {
            baz: 12
          }
        }), {
          foo: 'faz',
          baz: 12
        });
      });
      it('should add defaults if options.defaults is true', () => {
        should.deepEqual(s.flatten({
          styles: {
            foo: 'faz'
          }
        }, {defaults: true}), {
          foo: 'faz',
          bar: 0
        });
        should.deepEqual(s.flatten(null, {defaults: true}), {
          foo: 'foo',
          bar: 0
        });
      });
      it('should include properties other than style and attributes', () => {
        should.deepEqual(s.flatten({type: 'foo', styles:{foo: 'blob'}}), {
          type: 'foo',
          foo: 'blob'
        });
      });
      it('should skip properties that are not in the spec', () => {
        should.deepEqual(s.flatten({attributes: {foo: 'bar', bar: 12}, styles:{fasf: 'fasfasfaf'}}), {
          bar: 12
        });
      });

    });

    describe('#expand', () => {
      it('should return an object with empty styles and attributes empty object or null', () => {
        should.deepEqual(s.expand({}), {styles: {}, attributes: {}});
        should.deepEqual(s.expand(null), {styles: {}, attributes: {}});
      });
      it('should expand a list of props and not add defaults', () => {
        should.deepEqual(s.expand({
          foo: 'faz',
          baz: 12
        }), {
          styles: {
            foo: 'faz'
          },
          attributes: {
            baz: 12
          }
        });
      });
      it('should add defaults if options.defaults is true', () => {
        should.deepEqual(s.expand({
          foo: 'faz'
        }, {defaults: true}), {
          styles: {
            foo: 'faz'
          },
          attributes: {
            bar: 0
          }
        });
        should.deepEqual(s.expand(null, {defaults: true}), {
          styles: {
            foo: 'foo'
          },
          attributes: {
            bar: 0
          }
        });
      });
      it('should include properties other than style and attributes', () => {
        should.deepEqual(s.expand({type: 'foo', foo: 'bloo'}), {
          type: 'foo',
          styles: {
            foo: 'bloo'
          },
          attributes: {}
        });
      });
    });

    describe('#generate', () => {
      it('should generate a new element with defaults with null props', () => {
        var newEl = s.generate();
        should.deepEqual(newEl, {
          type: 'foo',
          styles: {
            foo: 'foo'
          },
          attributes: {
            bar: 0
          }
        });
      });
      it('should generate a new element and merge props with defaults', () => {
        var newEl = s.generate({
          baz: 12
        });
        should.deepEqual(newEl, {
          type: 'foo',
          styles: {
            foo: 'foo'
          },
          attributes: {
            bar: 0,
            baz: 12
          }
        });
      });
    });

    describe('#isStyleOrAttribute', () => {
      it('should return styles for style props', () => {
        should.equal(s.isStyleOrAttribute('foo'), 'styles');
      });
      it('should return attributes for attribute props', () => {
        should.equal(s.isStyleOrAttribute('bar'), 'attributes');
      });
      it('should return undefined for props that aren not in the spec', () => {
        should.equal(s.isStyleOrAttribute('bloop'), undefined);
      });
    });

  });

});
