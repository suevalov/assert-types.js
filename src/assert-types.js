/*
 * -------------------------------------------------------
 * Project: assertTypes.js
 * Version: 0.2.0
 *
 * Author:  Alexander Suevalov
 * Site:    http://suevalov.com
 * Contact: suevalov.me@gmail.com
 *
 * Copyright (c) 2014 Alexander Suevalov
 * -------------------------------------------------------
 */
(function (root, factory) {

    if (typeof define === 'function' && define.amd) {

        define(['underscore', 'exports'], function (_, exports) {
            root.assertTypes = factory(root, exports, _);
        });

    } else if (typeof exports !== 'undefined') {

        var _ = require('underscore');
        factory(root, exports, _);

    } else {
        root.assertTypes = factory(root, {}, root._);
    }

}(this, function (root, assertTypes, _) {

    'use strict';

    function internalAssert(func, value, condition) {

        var conditionType = typeof condition;
        var conditionResult = condition;

        if (conditionType !== 'undefined') {
            if (conditionType === 'function') {
                conditionResult = condition(value);
            }

            if (typeof conditionResult !== 'boolean') {
                throw 'Assert condition should return boolean value';
            }

            if (!conditionResult) {
                return;
            }
        }

        func();

    }

    var oneParamAssert = function (fn, message, value, condition) {
        internalAssert(function () {
            if (!fn(value)) {
                throw new Error(_.template(message, {
                    value: JSON.stringify(value)
                }));
            }
        }, value, condition);
    };

    assertTypes.number = function (value, condition) {
        oneParamAssert(function (value) {
            return _.isNumber(value);
        }, "Expect <%= value %> to be a number", value, condition);
    };

    assertTypes.numberPositive = function (value, condition) {
        oneParamAssert(function (value) {
            return _.isNumber(value) && value > 0;
        }, "Expect <%= value %> to be a positive number", value, condition);
    };

    assertTypes.numberNegative = function (value, condition) {
        oneParamAssert(function (value) {
            return _.isNumber(value) && value < 0;
        }, "Expect <%= value %> to be a negative number", value, condition);
    };

    assertTypes.numberOdd = function (value, condition) {
        oneParamAssert(function (value) {
            return _.isNumber(value) && (value % 2 === 1);
        }, "Expect <%= value %> to be a odd number", value, condition);
    };

    assertTypes.numberEven = function (value, condition) {
        oneParamAssert(function (value) {
            return _.isNumber(value) && (value % 2 === 0);
        }, "Expect <%= value %> to be a even number", value, condition);
    };

    assertTypes.numberInt = function (value, condition) {
        oneParamAssert(function (value) {
            return _.isNumber(value) && (value % 1 === 0);
        }, "Expect <%= value %> to be a int number", value, condition);
    };

    assertTypes.numberFloat = function (value, condition) {
        oneParamAssert(function (value) {
            return _.isNumber(value) && (value % 1 !== 0);
        }, "Expect <%= value %> to be a float number", value, condition);
    };

    assertTypes.numberRange = function (value, minValue, maxValue, condition) {
        internalAssert(function () {
            if (!(_.isNumber(value) && value > minValue && value < maxValue)) {
                throw new Error(_.template('Expect <%= value %> to be in a [<%= minValue %>, <%= maxValue %>] range', {
                    value: JSON.stringify(value),
                    minValue: JSON.stringify(minValue),
                    maxValue: JSON.stringify(maxValue)
                }));
            }
        }, value, condition);
    };

    assertTypes.equal = function (value, expectedValue, condition) {
        internalAssert(function () {
            if (!_.isEqual(value, expectedValue)) {
                throw new Error(_.template('Expect <%= value %> to equal <%= expectedValue %>', {
                    value: JSON.stringify(value),
                    expectedValue: JSON.stringify(expectedValue)
                }));
            }
        }, value, condition);
    };

    assertTypes.bool = function (value, condition) {
        oneParamAssert(function (value) {
            return _.isBoolean(value);
        }, "Expect <%= value %> to be boolean", value, condition);
    };

    assertTypes.boolTrue = function (value, condition) {
        oneParamAssert(function (value) {
            return value === true;
        }, "Expect <%= value %> to be true", value, condition);
    };

    assertTypes.boolFalse = function (value, condition) {
        oneParamAssert(function (value) {
            return value === false;
        }, "Expect <%= value %> to be false", value, condition);
    };

    assertTypes.object = function (value, condition) {
        oneParamAssert(function (value) {
            if (_.isObject(value)) {
                if (_.keys(value).length > 0) {
                    return true;
                } else {
                    return _.isEqual(value, {});
                }
            } else {
                return false;
            }
        }, "Expect <%= value %> to be an object", value, condition);
    };

    assertTypes.fn = function (value, condition) {
        oneParamAssert(function (value) {
            return _.isFunction(value);
        }, "Expect <%= value %> to be a function", value, condition);
    };

    assertTypes.array = function (value, condition) {
        oneParamAssert(function (value) {
            return _.isArray(value);
        }, "Expect <%= value %> to be an array", value, condition);
    };

    assertTypes.string = function (value, condition) {
        oneParamAssert(function (value) {
            return _.isString(value);
        }, "Expect <%= value %> to be a string", value, condition);
    };

    assertTypes.stringNotEmpty = function (value, condition) {
        oneParamAssert(function (value) {
            return _.isString(value) && value !== "";
        }, "Expect <%= value %> to be non-empty a string", value, condition);
    };

    assertTypes.instance = function(value, instance, condition) {
        internalAssert(function () {
            if (!(value instanceof instance)) {
                throw new Error(_.template('Expect <%= value %> to be an instance of <%= instance %>', {
                    value: value,
                    instance: instance
                }));
            }
        }, value, condition);
    };

    assertTypes.nulled = function (value, condition) {
        oneParamAssert(function (value) {
            return value === null;
        }, "Expect <%= value %> to equal 'null'", value, condition);
    };

    assertTypes.defined = function(value, condition) {
        oneParamAssert(function (value) {
            return value !== void 0;
        }, "Expect <%= value %> to be defined", value, condition);
    };

    assertTypes.date = function(value, condition) {
        oneParamAssert(function(value) {
            return _.isDate(value);
        }, "Expect <%= value %> to be a date object", value, condition);
    };

    /// Conditions

    assertTypes.conditionIfDefined = function (value) {
        return (value !== null) && (typeof value !== 'undefined');
    };

    assertTypes.VERSION = '0.2.1';

    return assertTypes;

}));
