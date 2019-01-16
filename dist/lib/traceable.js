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
function _traceable(flag, name) {
    return function (target, key, dtor) {
        var wrap = function wrap(fn, callback) {
            var gn = fn;
            if (!flag) {
                gn.__traced__ = null;
            } else {
                if (gn.__traced__ === undefined) {
                    if (name !== undefined) {
                        gn.__traced__ = name;
                    } else {
                        if (target.constructor && target.constructor.name !== undefined) {
                            gn.__traced__ = target.constructor.name;
                        } else if (target.name !== undefined) {
                            gn.__traced__ = target.name;
                        } else {
                            gn.__traced__ = "@";
                        }
                    }
                    var tn = function tn() {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                            args[_key] = arguments[_key];
                        }

                        var trace = global.TRACE;
                        if (trace !== false && trace) {
                            var _console = global.CONSOLE ? global.CONSOLE : console;
                            setTimeout(function () {
                                _console.group(gn.__traced__ + "." + key);
                                if (args.length > 0) {
                                    _console.debug.apply(_console, args);
                                }
                                if (result !== undefined) {
                                    _console.debug(result);
                                }
                            }, global.TRACE || 0);
                            var result = gn.apply(this, args);
                            setTimeout(function () {
                                _console.groupEnd();
                            }, global.TRACE || 0);
                            return result;
                        } else {
                            return gn.apply(this, args);
                        }
                    };
                    for (var el in gn) {
                        if (gn.hasOwnProperty(el)) {
                            tn[el] = gn[el];
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
exports._traceable = _traceable;
exports.default = traceable;
//# sourceMappingURL=traceable.js.map