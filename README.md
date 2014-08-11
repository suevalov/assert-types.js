# assert-types.js

[![Build Status](https://travis-ci.org/suevalov/assert-types.js.svg?branch=master)](https://travis-ci.org/suevalov/assert-types.js)

A small JavaScript library for arguments assertion. Browser and Node.JS compatible.

* [What's the mission](#whats-the-mission)
* [Dependencies](#dependencies)
* [How to install](#how-to-install)
* [How to use](#how-to-use)
  * [Loading library](#loading-library) 
  * [Assertions](#assertions)
  * [Conditions](#conditions)
* [License](#license)

## What's the mission

The main mission is to provide simple and slick API for checking arguments and throwing exceptions. Let's get rid of explicit complex conditions.

## Dependencies

- Underscore.js

7.5 Kb unminified with comments, 3.6 Kb minified

## How to install

### NPM

```javascript
npm install assert-types
```

### Bower

```javascript
bower install assert-types.js
```

### Development and contributing

Install dependencies

`npm install && bower install`

Build Project

`npm run build`

Run Tests

`npm run test`

## How to use

### Loading library

If you're running in Node.js, you can `require` assertTypes.js like so:

```javascript
var assertTypes = require('assert-types');
```

It also supports Require.js:

```javascript
require.config({
	paths: {
		'assert-types': 'assert-types.js/dist/assert-types.min.js'
	}
});

require(['assert-types'], function(assert) {});
```

Also assertTypes.js could be included with an HTML `<script>` tag and `assertTypes` variable will be visible globally.

### Assertions

```javascript

// Numbers

assertTypes.number(num);
assertTypes.numberPositive(num);
assertTypes.numberNegative(num);
assertTypes.numberOdd(num);
assertTypes.numberEven(num);
assertTypes.numberInt(num);
assertTypes.numberFloat(num);
assertTypes.numberRange(num, min, max);

// Equals

assertTypes.equal(value, expectedValue);

// Boolean

assertTypes.bool(value);
assertTypes.boolTrue(value);
assertTypes.boolFalse(value);

// String

assertTypes.string(value);
assertTypes.stringNotEmpty(value);

// Other 

assertTypes.object(value);
assertTypes.fn(value);
assertTypes.array(value);
assertTypes.instance(value, instance);
assertTypes.nulled(value); 
assertTypes.defined(value);
assertTypes.date(value);

```

In case if assertion is failed, assertTypes will throw Error.

### Conditions

Also the library has possibility to define conditions. Let's take a look here:

```javascript

// These could be translated as: if value is defined then it should be a number
assertTypes.number(value, assertTypes.conditionIfDefined);

// Other examples
assertTypes.object(value, assertTypes.conditionIfDefined);

// You can define your own conditions
assertTypes.defined(value, today === 'Friday'); 

// Condition could be a function
assertTypes.numberPositive(value, function(value) {
    
    return today === 'Friday' || today === 'Monday';
    
});

```

The assertion will be performed if condition is true;

## Maintainers

- [Alexander Suevalov](https://github.com/suevalov)

## License

[MIT](https://github.com/suevalov/assert-types.js/blob/master/LICENSE)
