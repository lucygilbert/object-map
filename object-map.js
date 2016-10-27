(function (global) {
  function objectMap(sourceObject, mapFunction) {
    return {};
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = objectMap;
  } else {
    global.objectMap = objectMap;
  }
}(this))
