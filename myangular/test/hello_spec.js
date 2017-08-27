var sayHello = require('../src/hello');
describe('Hello', function () {
    it('says hello', function () {
        expect(sayHello('joke')).toBe('Hello, joke!');
    });
});