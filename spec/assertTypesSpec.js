var expect,
    assertTypes,
    _;

if (typeof exports !== 'undefined') {
    expect = require('chai').expect;
    assertTypes = require('../src/assertTypes');
    _ = require('underscore');
} else {
    expect = window.expect;
    assertTypes = window.assertTypes;
    _ = window._;
}

describe('assertTypes', function () {

    it('should be defined', function () {
        expect(assertTypes).not.to.be.an('undefined');
        expect(assertTypes).to.be.an('object');
    });

    it('should have valid version', function () {
        expect(assertTypes.VERSION).to.equal('0.2.0');
    });

    describe('equal()', function () {

        it('should not throw errors for equal objects', function () {

            var pairs = [
                [ 123, 123 ],
                ["123", "123"],
                [
                    { test: 123 },
                    { test: 123 }
                ],
                [ true, true ],
                [ false, false ],
                [
                    [123, 1234],
                    [123, 1234]
                ]
            ];

            expect(function () {
                _.each(pairs, function (pair) {
                    assertTypes.equal(pair[0], pair[1]);
                });
            }).not.to.throw(Error);

        });

        it('should throw errors for non-equal objects', function () {

            expect(function () {
                assertTypes.equal(1234, 123);
            }).to.throw();

            expect(function () {
                assertTypes.equal(true, false);
            }).to.throw();

            expect(function () {
                assertTypes.equal("1234", "123");
            }).to.throw();

            expect(function () {
                assertTypes.equal({ test: 123 }, 123);
            }).to.throw();

        });

    });

    describe('number()', function () {

        it('should not throw error if value is a number', function () {

            expect(function() {
                assertTypes.number(123);
            }).not.to.throw();

            expect(function() {
                assertTypes.number(0);
            }).not.to.throw();

            expect(function() {
                assertTypes.number(1.123);
            }).not.to.throw();

        });

        it('should throw error if value is not a number', function() {

            expect(function() {
                assertTypes.number("123");
            }).to.throw();

            expect(function() {
                assertTypes.number({});
            }).to.throw();

            expect(function() {
                assertTypes.number(null);
            }).to.throw();

            expect(function() {
                assertTypes.number(undefined);
            }).to.throw();

            expect(function() {
                assertTypes.number(['123']);
            }).to.throw();

        });

    });

    describe('numberPositive()', function() {

        it('should not throw error if value is a positive number', function() {
            expect(function() {
                assertTypes.numberPositive(123);
            }).not.to.throw();
        });

        it('should throw error if value is not a positive number', function() {

            expect(function() {
                assertTypes.numberPositive("123");
            }).to.throw();

            expect(function() {
                assertTypes.numberPositive({});
            }).to.throw();

            expect(function() {
                assertTypes.numberPositive(null);
            }).to.throw();

            expect(function() {
                assertTypes.numberPositive(undefined);
            }).to.throw();

            expect(function() {
                assertTypes.numberPositive(['123']);
            }).to.throw();

            expect(function() {
                assertTypes.numberPositive(-12);
            }).to.throw();

        });

    });

    describe('numberNegative()', function() {

        it('should not throw error if value is a negative number', function() {
            expect(function() {
                assertTypes.numberNegative(-1);
            }).not.to.throw();

            expect(function() {
                assertTypes.numberNegative(-12312);
            }).not.to.throw();
        });

        it('should throw error if value is not a negative number', function() {

            expect(function() {
                assertTypes.numberNegative("123");
            }).to.throw();

            expect(function() {
                assertTypes.numberNegative({});
            }).to.throw();

            expect(function() {
                assertTypes.numberNegative(null);
            }).to.throw();

            expect(function() {
                assertTypes.numberNegative(undefined);
            }).to.throw();

            expect(function() {
                assertTypes.numberNegative(['123']);
            }).to.throw();

            expect(function() {
                assertTypes.numberNegative(123);
            }).to.throw();

        });

    });

    describe('numberOdd()', function() {

        it('should not throw error if value is an odd number', function() {

            expect(function() {
                assertTypes.numberOdd(3);
            }).not.to.throw();

            expect(function() {
                assertTypes.numberOdd(7);
            }).not.to.throw();

        });

        it('should throw error if value is not an odd number', function() {

            expect(function() {
                assertTypes.numberOdd('asassa')
            }).to.throw();

            expect(function() {
                assertTypes.numberOdd(16);
            }).to.throw();

        });

    });

    describe('numberEven()', function() {

        it('should not throw error if value is an even number', function() {

            expect(function() {
                assertTypes.numberEven(2);
            }).not.to.throw();

            expect(function() {
                assertTypes.numberEven(8);
            }).not.to.throw();

        });

        it('should throw error if value is not an even number', function() {

            expect(function() {
                assertTypes.numberEven('asassa')
            }).to.throw();

            expect(function() {
                assertTypes.numberEven(15);
            }).to.throw();

        });

    });

    describe('numberInt()', function() {

        it('should not throw error if value is an integer number', function() {

            expect(function() {
                assertTypes.numberInt(2);
            }).not.to.throw();

            expect(function() {
                assertTypes.numberInt(255);
            }).not.to.throw();

        });

        it('should throw error if value is not an integer number', function() {

            expect(function() {
                assertTypes.numberInt('asassa')
            }).to.throw();

            expect(function() {
                assertTypes.numberInt(15.25);
            }).to.throw();

        });

    });

    describe('numberFloat()', function() {

        it('should not throw error if value is a float number', function() {

            expect(function() {
                assertTypes.numberFloat(2.11);
            }).not.to.throw();

            expect(function() {
                assertTypes.numberFloat(255.89);
            }).not.to.throw();

        });

        it('should throw error if value is not a float number', function() {

            expect(function() {
                assertTypes.numberFloat('asassa')
            }).to.throw();

            expect(function() {
                assertTypes.numberFloat(15);
            }).to.throw();

        });

    });

    describe('numberRange()', function() {

        it('should not throw error if value is in a range', function() {

            expect(function() {
                assertTypes.numberRange(2.11, 0, 3);
            }).not.to.throw();

            expect(function() {
                assertTypes.numberRange(255.89, 200, 400);
            }).not.to.throw();

        });

        it('should throw error if value is not in a range', function() {

            expect(function() {
                assertTypes.numberRange(12, 15, 20)
            }).to.throw();

            expect(function() {
                assertTypes.numberRange(-1, -5, -2);
            }).to.throw();

        });

    });

    describe('bool()', function() {

        it('should not throw error if value is boolean', function() {

            expect(function() {
                assertTypes.bool(true);
            }).not.to.throw();

            expect(function() {
                assertTypes.bool(false);
            }).not.to.throw();

        });

        it('should throw error if value is not boolean', function() {

            expect(function() {
                assertTypes.bool("")
            }).to.throw();

            expect(function() {
                assertTypes.bool(undefined);
            }).to.throw();

            expect(function() {
                assertTypes.bool(null);
            }).to.throw();

            expect(function() {
                assertTypes.bool([]);
            }).to.throw();

            expect(function() {
                assertTypes.bool({});
            }).to.throw();

        });

    });

    describe('boolTrue()', function() {

        it('should not throw error if value is true', function() {

            expect(function() {
                assertTypes.boolTrue(true);
            }).not.to.throw();

        });

        it('should throw error if value is not true', function() {

            expect(function() {
                assertTypes.boolTrue("")
            }).to.throw();

            expect(function() {
                assertTypes.boolTrue(undefined);
            }).to.throw();

            expect(function() {
                assertTypes.boolTrue(null);
            }).to.throw();

            expect(function() {
                assertTypes.boolTrue([]);
            }).to.throw();

            expect(function() {
                assertTypes.boolTrue({});
            }).to.throw();

            expect(function() {
                assertTypes.boolTrue(false);
            }).to.throw();

        });

    });

    describe('boolFalse()', function() {

        it('should not throw error if value is false', function() {

            expect(function() {
                assertTypes.boolFalse(false);
            }).not.to.throw();

        });

        it('should throw error if value is not false', function() {

            expect(function() {
                assertTypes.boolFalse("")
            }).to.throw();

            expect(function() {
                assertTypes.boolFalse(undefined);
            }).to.throw();

            expect(function() {
                assertTypes.boolFalse(null);
            }).to.throw();

            expect(function() {
                assertTypes.boolFalse([]);
            }).to.throw();

            expect(function() {
                assertTypes.boolFalse({});
            }).to.throw();

            expect(function() {
                assertTypes.boolFalse(true);
            }).to.throw();

        });

    });

    describe('object()', function() {

        it('should not throw error if value is an object', function() {

            expect(function() {
                assertTypes.object({});
            }).not.to.throw();

            expect(function() {
                assertTypes.object({ test: 123 });
            }).not.to.throw();

        });

        it('should throw error if value is not an object', function() {

            expect(function() {
                assertTypes.object("")
            }).to.throw();

            expect(function() {
                assertTypes.object(undefined);
            }).to.throw();

            expect(function() {
                assertTypes.object(null);
            }).to.throw();

            expect(function() {
                assertTypes.object(true);
            }).to.throw();

            expect(function() {
                assertTypes.object([]);
            }).to.throw();

            expect(function() {
                assertTypes.object(function() {});
            }).to.throw();

            expect(function() {
                assertTypes.object(new Number(1));
            }).to.throw();

        });

    });

    describe('fn()', function() {

        it('should not throw error if value is a function', function() {

            expect(function() {
                assertTypes.fn(function() {});
            }).not.to.throw();

        });

        it('should throw error if value is not function', function() {

            expect(function() {
                assertTypes.fn({})
            }).to.throw();

            expect(function() {
                assertTypes.fn('test')
            }).to.throw();

            expect(function() {
                assertTypes.fn(null)
            }).to.throw();

            expect(function() {
                assertTypes.fn(undefined)
            }).to.throw();

        })

    });

    describe('array()', function() {

        it('should not throw error if value is an array', function() {

            expect(function() {
                assertTypes.array([]);
            }).not.to.throw();

            expect(function() {
                assertTypes.array([ 'test', 123 ]);
            }).not.to.throw();

            expect(function() {
                assertTypes.array([ [ 1, 2, 3 ], [ '1', '2', '3' ] ]);
            }).not.to.throw();

        });

        it('should throw error if value is not an array', function() {

            expect(function() {
                assertTypes.array({})
            }).to.throw();

            expect(function() {
                assertTypes.array('test')
            }).to.throw();

            expect(function() {
                assertTypes.array(null)
            }).to.throw();

            expect(function() {
                assertTypes.array(undefined)
            }).to.throw();

        })

    });

    describe('string()', function() {


        it('should not throw error if value is a string', function() {

            expect(function() {
                assertTypes.string('');
            }).not.to.throw();

            expect(function() {
                assertTypes.string('test');
            }).not.to.throw();

        });

        it('should throw error if value is not a string', function() {

            expect(function() {
                assertTypes.string({});
            }).to.throw();

            expect(function() {
                assertTypes.string([ '1', '2', '3'] );
            }).to.throw();

            expect(function() {
                assertTypes.string(null);
            }).to.throw();

            expect(function() {
                assertTypes.string(undefined);
            }).to.throw();

        });

    });

    describe('stringNotEmpty()', function() {


        it('should not throw error if value is a string', function() {

            expect(function() {
                assertTypes.stringNotEmpty('test');
            }).not.to.throw();

        });

        it('should throw error if value is not a string', function() {

            expect(function() {
                assertTypes.stringNotEmpty('');
            }).to.throw();

            expect(function() {
                assertTypes.stringNotEmpty({});
            }).to.throw();

            expect(function() {
                assertTypes.stringNotEmpty([ '1', '2', '3'] );
            }).to.throw();

            expect(function() {
                assertTypes.stringNotEmpty(null);
            }).to.throw();

            expect(function() {
                assertTypes.stringNotEmpty(undefined);
            }).to.throw();

        });

    });

    describe('nulled()', function() {

        it('should not throw error if value is null', function() {

            expect(function() {
                assertTypes.nulled(null);
            }).not.to.throw();

        });

        it('should throw error if value is not null', function() {

            expect(function() {
                assertTypes.nulled(undefined);
            }).to.throw();

            expect(function() {
                assertTypes.nulled('');
            }).to.throw();

            expect(function() {
                assertTypes.nulled({});
            }).to.throw();

        });

    });

    describe('defined()', function() {

        it('should throw error if value is undefined', function() {

            expect(function() {
                assertTypes.defined(undefined);
            }).to.throw();

        });

        it('should not throw error otherwise', function() {

            expect(function() {
                assertTypes.defined(null);
            }).not.to.throw();

            expect(function() {
                assertTypes.defined({});
            }).not.to.throw();

            expect(function() {
                assertTypes.defined('');
            }).not.to.throw();

            expect(function() {
                assertTypes.defined([]);
            }).not.to.throw();

        });

    });

    describe('date()', function() {

        it('should not throw error if value is date', function() {

            expect(function() {
                assertTypes.date(new Date());
            }).not.to.throw();

        });

        it('should throw error otherwise', function() {

            expect(function() {
                assertTypes.date('2014-12-12');
            }).to.throw();

            expect(function() {
                assertTypes.date(null);
            }).to.throw();

            expect(function() {
                assertTypes.date(undefined);
            }).to.throw();

        });

    });


});
