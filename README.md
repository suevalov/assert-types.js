# assertTypes.js

A small JavaScript library for argumets assertion. Browser and Node.JS compatible.

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

Install dependencies

`npm install && bower install`

Build Project

`npm run build`

Run Tests

`npm run test`

## How to use

### Loading library

If you're running in Node.js, Browserify or another Common.js environment, you can `require` assertTypes.js like so:

```javascript
var assertTypes = require('assertTypes');
```

It also supports Require.js:

```javascript
require.config({
	paths: {
		assertTypes: 'assertTypes.js/dist/assertTypes.min.js'
	}
});

require(['assertTypes'], function(assertTypes) {});
```

Also assertTypes.js could be included with an HTML `<script>` tag and `assertTypes` variable will be visible  globally.

### Assertions

### Conditions

## Maintainers

- [Alexander Suevalov](https://github.com/suevalov)

## License

[MIT](https://github.com/suevalov/assertTypes/blob/master/LICENSE)
