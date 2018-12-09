var assert = require('assert');
var PromiseChain = require('../index');

var value = 5;
describe('PromiseChain', function () {
    describe('#1st()', function () {
        it('should be initial value', function () {
            assert.equal(value, value);
        });
    });
});

var prom = new Promise(function (res, rej) {
    res(value);
});
var pChain = new PromiseChain(prom);

pChain.then(function (res) {
    console.log("res1", res);
    describe('#2nd()', function () {
        it('should be still initial value', function () {
            assert.equal(res, value);
        });
    });
    var prom2 = new Promise(function (res2, rej) {
        res2(res + 2);
        //rej("Heckin error 2");
    });
    return prom2;
})
    .catch(console.warn)
    .catch(console.warn)
    .then(function (res) {
        console.log("res2", res);
        describe('#3rd()', function () {
            it('should be incremented by 2', function () {
                assert.equal(res, value + 2);
            });
        });
        var prom2 = new Promise(function (res2, rej) {
            res2(res + 2);
            // rej("Heckin error");
        });
        return prom2;
    })
    .catch(console.warn)
    .catch(console.warn)
    .catch(console.warn)
    .catch(console.warn)
    .catch(console.warn)
    .catch(console.warn)
    .catch(console.warn)
    .then(function (res) {
        console.log("res3", res);
        describe('#4th()', function () {
            it('should be incremented by 4', function () {
                assert.equal(res, value + 4);
            });
        });
        var prom2 = new Promise(function (res2, rej) {
            res2(res + 2);
        });
        return prom2;
    })
    .catch(console.warn)
    .then(function (res) {
        console.log("res4", res);
        describe('#last()', function () {
            it('should be incremented by 6', function () {
                assert.equal(res, value + 6);
            });
        });
        var prom2 = new Promise(function (res2, rej) {
            res2(res + 2);
        });
        return prom2;
    });