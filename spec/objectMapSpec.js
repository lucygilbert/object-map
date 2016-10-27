var objectMap = require('../object-map.js');

describe('objectMap', function () {
  it('gets exported upon initialization', function () {
    expect(typeof objectMap).toEqual('function');
  });
});
