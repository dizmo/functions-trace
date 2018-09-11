"use strict";
/* tslint:disable:ban-types */
/* tslint:disable:only-arrow-functions */
/* tslint:disable:space-before-function-paren */

Object.defineProperty(exports, "__esModule", { value: true });
var traceable_1 = require("./traceable");
function trace(arg) {
    if (typeof arg === "boolean") {
        return _trace(arg);
    } else {
        _trace(true)(arg);
    }
}
exports.trace = trace;
function _trace(flag) {
    return function (ctor) {
        Object.keys(ctor.prototype).forEach(function (key) {
            var dtor = Object.getOwnPropertyDescriptor(ctor.prototype, key);
            if (dtor && typeof dtor.value === "function") {
                traceable_1.traceable(flag)(ctor.prototype, key);
            }
        });
        Object.keys(ctor).forEach(function (key) {
            var dtor = Object.getOwnPropertyDescriptor(ctor, key);
            if (dtor && typeof dtor.value === "function") {
                traceable_1.traceable(flag)(ctor, key);
            }
        });
    };
}
exports.default = trace;
//# sourceMappingURL=trace.js.map