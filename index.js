// var Promise = require("promise-polyfill");

var PromiseChain = function (promise) {
    var _this = this;
    _this._thenFunctions = [];
    _this._failFunctions = [];
    _this._catchFunctions = [];
    _this._mainPromise = promise;

    _this._attachThen();
};

PromiseChain.prototype.then = function (success, fail) {
    var _this = this;
    _this._thenFunctions.push(success);
    _this._failFunctions.push(fail);
    _this.catch(function(){});
    return this;
};

PromiseChain.prototype.catch = function (reason) {
    var _this = this;
    if (!_this._catchFunctions[_this._thenFunctions.length - 1]) {
        _this._catchFunctions[_this._thenFunctions.length - 1] = [];
    }
    _this._catchFunctions[_this._thenFunctions.length - 1].push(reason);
    return this;
};

PromiseChain.prototype._attachThen = function () {
    var _this = this;

    _this._mainPromise.then(function (val) {
        if (typeof _this._thenFunctions[0] === "function") {
            _this._mainPromise = _this._thenFunctions[0](val);
            _this._attachThen(_this);
        }
        _this._onExecutedOne();
        return val;
    }, function (reason) {
        if (typeof _this._failFunctions[0] === "function") {
            _this._failFunctions[0](reason);
            _this._onExecutedOne();
        } else {
            var catchFncs = _this._catchFunctions[0];
            if (catchFncs && catchFncs.length) {
                for (var i = 0; i < catchFncs.length; i++) {
                    if (typeof catchFncs[i] === "function") {
                        catchFncs[i](reason);
                    }
                }
            }
            _this._catchFunctions.splice(0, 1);
        }
    }).catch(function (reason) {
        var catchFncs = _this._catchFunctions[0];
        if (catchFncs && catchFncs.length) {
            for (var i = 0; i < catchFncs.length; i++) {
                if (typeof catchFncs[i] === "function") {
                    catchFncs[i](reason);
                }
            }
        }
        _this._catchFunctions.splice(0, 1);
    });
};

PromiseChain.prototype._onExecutedOne = function () {
    var _this = this;
    _this._thenFunctions.splice(0, 1);
    _this._failFunctions.splice(0, 1);
    _this._catchFunctions.splice(0, 1);
};


var module = module || {};

module.exports = PromiseChain;
