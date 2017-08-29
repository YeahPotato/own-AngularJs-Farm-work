"use strict";
var Scope = require("../src/scope");

describe("Scope", function() {
    /* it("can be constructed and used as an object", function() {
         var scope = new Scope();
         scope.aProperty = 1;
         expect(scope.aProperty).toBe(1);
     });*/

    describe("digest", function() {
        var scope;
        beforeEach(function() {
            scope = new Scope();
        });
        /*it("calls the listener function of a watch on first $digest", function() {
            var watchFn = function() {
                return "wat";
            };
            var listenerFn = jasmine.createSpy();
            scope.$watch(watchFn, listenerFn);
            scope.$digest();
            expect(listenerFn).toHaveBeenCalled();
        });

        it('calls the watch function with the scope as the argument', function() {
            var watchFn = jasmine.createSpy();
            var listenerFn = function() {};
            scope.$watch(watchFn, listenerFn);
            scope.$digest();
            expect(watchFn).toHaveBeenCalledWith(scope);
        });*/

        /*it('calls the listener function when the watched value changes', function() {
            scope.newVal = 'a';
            scope.count = 0;
            scope.$watch(
                function(scope) { return scope.newVal; },
                function(newVal, oldVal, self) { scope.count++; }
            );

            expect(scope.count).toBe(0);
            scope.$digest();
            expect(scope.count).toBe(1);
            scope.$digest();
            expect(scope.count).toBe(1);
            scope.newVal = 'b';
            scope.$digest();
            expect(scope.count).toBe(2);
            scope.$digest();
            expect(scope.count).toBe(2);
        });*/
        /*it('calls listener when watch value is first undefined',function(){
            scope.count=0;
            scope.$watch(
                function(scope){return scope.someValue;},
                function(newVal,oldVal,scope){scope.count++;}
            );
            scope.$digest();
            sxpect(scope.count).toBe(1);
        })*/
        /* it('calls listener with new value as old value the first time', function() {
             scope.someValue = 123;
             scope.sameValue = 0;
             var oldVlaueGiven;

             scope.$watch(
                 function(scope) { return scope.someValue; },
                 function(newVal, oldVal, self) {
                     oldVlaueGiven = oldVal;
                 }
             );

             scope.$digest();
             expect(oldVlaueGiven).toBe(123);
         });*/
        /*it('watch arr', function() {
            scope.aValue = [1, 2, 3];
            scope.counter = 0;
            scope.$watch(
                function(scope) { return scope.aValue; },
                function(newValue, oldValue, scope) {
                    scope.counter++;
                },
                true
            );
            scope.$digest();
            expect(scope.counter).toBe(1);
            scope.aValue.push(4);
            scope.$digest();
            expect(scope.counter).toBe(2);
        });*/

        /*it('catches exceptions in watch functions and continues', function() {
            scope.aValue = 'abc';
            scope.counter = 0;
            scope.$watch(
                function(scope) { throw 'Error'; },
                function(newValue, oldValue, scope) {}
            );
            scope.$watch(
                function(scope) { return scope.aValue; },
                function(newValue, oldValue, scope) {
                    scope.counter++;
                }
            );
            scope.$digest();
            expect(scope.counter).toBe(1);
        });
        it('catches exceptions in listener functions and continues', function() {
            scope.aValue = 'abc';
            scope.counter = 0;
            scope.$watch(
                function(scope) { return scope.aValue; },
                function(newValue, oldValue, scope) {
                    throw 'Error';
                }
            );
            scope.$watch(
                function(scope) { return scope.aValue; },
                function(newValue, oldValue, scope) {
                    scope.counter++;
                }
            );
            scope.$digest();
            expect(scope.counter).toBe(1);
        });*/

        it('allows destroying a $watch during digest', function() {
            scope.aValue = 'abc';
            var watchCalls = [];
            scope.$watch(
                function(scope) {
                    watchCalls.push('first');
                    return scope.aValue;
                }
            );
            var destroyWatch = scope.$watch(
                function(scope) {
                    watchCalls.push('second');
                    destroyWatch();
                }
            );
            scope.$watch(
                function(scope) {
                    watchCalls.push('third');
                    return scope.aValue;
                }
            );
            scope.$digest();
            expect(watchCalls).toEqual(['first', 'second', 'third', 'first', 'third']);
        });
    });
});