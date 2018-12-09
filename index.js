var Promise = require("promise-polyfill");

var PromiseChain = function (promise) {
    var _this = this;
    _this._mainPromise = promise;
    _this._promise = new Promise(function (res, rej) {
        _this._resolver = res;
        _this._rejector = rej;
    });

    _this._mainPromise.then(function (val) {
        _this._resolver(val);
        return val;
    }, function (reason) {
        _this._rejector(val);
    }).catch(function (reason) {
        _this._rejector(val);
    });
};

PromiseChain.prototype.then = function (success, fail) {
    _this._promise.then(success, fail);
    return this;
};

PromiseChain.prototype.catch = function (reason) {
    _this._promise.catch(success, fail);
    return this;
};

module.exports = PromiseChain;