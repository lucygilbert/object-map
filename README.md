# ObjectMap
A map function that takes an object argument and returns an object.

## Installation
For the moment installation is simply inserting the code into your codebase. You can then use require() to get the function if you are using Node.
## Use
`objectMap` takes two arguments. The first being an object to map and the second being the map function to run on each key/value pair. 

The map function will receive the arguments: `key`, `value`, `index`, `object`, in that order. `object` being the object that was supplied for mapping over.

Your function should return an object with any number of key/value pairs. These will be merged together to make the object that is returned by `objectMap`. If you provide a key multiple times, it will be overwritten. The final supplied value will be the value in the resulting object.

Examples:

```
var sourceObject = { a: 123, b: 456, c: 789 };
var result = objectMap(sourceObject, function (key, value, index, object) {
  var returnObject = {};
  returnObject[key + 'Doubled'] = value * 2;
  returnObject[key + 'Halved'] = value / 2;
  return returnObject;
});

// result = { 
//   aDoubled: 246,
//   aHalved: 61.5,
//   bDoubled: 912,
//   bHalved: 228,
//   cDoubled: 1578,
//   cHalved: 394.5
// }

var sourceObject = { Monday: true, Tuesday: false, Thursday: true };
var result = objectMap(sourceObject, function (key, value, index, object) {
  var returnObject = {};
  if (value) {
    returnObject[key.replace('day', '')] = key;
  }
  return returnObject;
});

// result = {
//  Mon: 'Monday',
//  Thurs: 'Thursday'
// }
```

## Known issues

If some or all of the keys of your object are numeric, most browsers will order them first, by size. Unfortunately object ordering is not guaranteed by the ECMA specification so there is not much of a way round this, short of using Maps (ES2015 only) instead.
