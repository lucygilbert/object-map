var objectMap = require('../object-map.js');

describe('objectMap', function () {
  it('gets exported upon initialization', function () {
    expect(typeof objectMap).toEqual('function');
  });

  it('throws an error if the first argument is not an object', function () {
    expect(objectMap.bind(this, 12, function () { return {}; })).toThrowError(/must be an object/);
  });

  it('throws an error if the second argument is not a function', function () {
    expect(objectMap.bind(this, { abc: 123 }, 'text')).toThrowError(/must be a function/);
  });

  it('maps all the properties of an object', function () {
    var originalObject = { abc: 123, a1b2: 'string', 234: true };
    var nonModifyingFunction = function (key, value) {
      var combination = {};
      combination[key] = value;
      return combination;
    };
    expect(objectMap(originalObject, nonModifyingFunction)).toEqual(originalObject);
  });

  it('returns an object formed from elements returned by the provided function', function () {
    var originalObject = { abc: 123, a1b2: 'string', 234: true };
    var booleanCapitalizeFunction = function (key, value) {
      var combination = {};
      combination[key.toString().toUpperCase()] = !!value;
      return combination;
    };
    expect(objectMap(originalObject, booleanCapitalizeFunction)).toEqual({
      ABC: true,
      A1B2: true,
      '234': true,
    });
  });

  it('can return an object formed from elements with several key value pairs', function () {
    var originalObject = { abc: 123, def: 'string', ghi: true };
    var multiElementFunction = function (key, value) {
      var combination = {};
      combination[key] = value;
      combination[key.toString().toUpperCase()] = value;
      return combination;
    };
    expect(objectMap(originalObject, multiElementFunction)).toEqual({
      abc: 123,
      ABC: 123,
      def: 'string',
      DEF: 'string',
      ghi: true,
      GHI: true,
    });
  });

  it('correctly calculates the index', function () {
    var originalObject = { abc: 123, a1b2: 'string', zee: true };
    var indexFunction = function (key, value, index) {
      var combination = {};
      combination[key] = index;
      return combination;
    };
    expect(objectMap(originalObject, indexFunction)).toEqual({
      abc: 0,
      a1b2: 1,
      zee: 2,
    });
  });

  it('passes the full object to each iteration of the map function', function () {
    var originalObject = { abc: 123, a1b2: 'string', 234: true };
    var fullObjectFunction = function (key, value, index, object) {
      var combination = {};
      combination[key] = object;
      return combination;
    };
    expect(objectMap(originalObject, fullObjectFunction)).toEqual({
      abc: originalObject,
      a1b2: originalObject,
      234: originalObject,
    });
  });
});
