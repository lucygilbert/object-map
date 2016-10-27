(function (global) {
  function objectMap(sourceObject, mapFunction) {
    var mappedObject = {};
    var index = 0;

    if (typeof sourceObject !== 'object') {
      throw new Error('The object provided as the first argument must be an object.');
    } else if (typeof mapFunction !== 'function') {
      throw new Error('The map function provided as the second argument must be a function.');
    }

    Object.keys(sourceObject).forEach(function (sourceKey) {
      var lastResult;

      lastResult = mapFunction(sourceKey, sourceObject[sourceKey], index, sourceObject);
      Object.keys(lastResult).forEach(function (resultKey) {
        mappedObject[resultKey] = lastResult[resultKey];
      });
      index++;
    });

    return mappedObject;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = objectMap;
  } else {
    global.objectMap = objectMap;
  }
}(this))
