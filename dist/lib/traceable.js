"use strict";
/* tslint:disable:ban-types */
/* tslint:disable:no-string-literal */
/* tslint:disable:only-arrow-functions */
/* tslint:disable:trailing-comma */
/* tslint:disable:variable-name */

Object.defineProperty(exports, "__esModule", { value: true });
function traceable(arg, key, dtor) {
    if (typeof arg === "boolean") {
        return _traceable(arg);
    } else {
        _traceable(true)(arg, key, dtor);
    }
}
exports.traceable = traceable;
function _traceable(flag) {
    return function (target, key, dtor) {
        var wrap = function wrap(fn, callback) {
            if (!flag) {
                fn["_traced"] = false;
            } else {
                if (fn["_traced"] === undefined) {
                    fn["_traced"] = true;
                    var tn = function tn() {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                            args[_key] = arguments[_key];
                        }

                        var T = global["TRACE"];
                        if (T !== false && T) {
                            var _console = global["CONSOLE"] ? global["CONSOLE"] : console;
                            var name = target.constructor && target.constructor.name || "@";
                            setTimeout(function () {
                                _console.group(name + "." + key);
                                if (args.length > 0) {
                                    _console.debug.apply(_console, args);
                                }
                                if (result !== undefined) {
                                    _console.debug(result);
                                }
                            }, T || 0);
                            var result = fn.apply(this, args);
                            setTimeout(function () {
                                _console.groupEnd();
                            }, T || 0);
                            return result;
                        } else {
                            return fn.apply(this, args);
                        }
                    };
                    for (var el in fn) {
                        if (fn.hasOwnProperty(el)) {
                            tn[el] = fn[el];
                        }
                    }
                    callback(tn);
                }
            }
        };
        if (dtor) {
            if (typeof dtor.value === "function") {
                wrap(dtor.value, function (tn) {
                    dtor.value = tn;
                });
            } else {
                if (typeof dtor.get === "function") {
                    wrap(dtor.get, function (tn) {
                        dtor.get = tn;
                    });
                }
                if (typeof dtor.set === "function") {
                    wrap(dtor.set, function (tn) {
                        dtor.set = tn;
                    });
                }
            }
        } else {
            wrap(target[key], function (tn) {
                target[key] = tn;
            });
        }
    };
}
exports.default = traceable;
//# sourceMappingURL=traceable.js.map