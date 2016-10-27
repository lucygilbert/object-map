var objectMap = require('../object-map.js');

describe('Known issues:', function () {
  describe('Browser object key ordering', function () {
    it('orders the numeric keys first, by their size', function () {
      var originalObject = { zee: 123, 234: true, 12: 'stuff', abc: {} };
      var indexFunction = function (key, value, index) {
        var combination = {};
        combination[key] = index;
        return combination;
      };
      expect(objectMap(originalObject, indexFunction)).toEqual({
        12: 0,
        234: 1,
        zee: 2,
        abc: 3,
      });
    });
  });
});
