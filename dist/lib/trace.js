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
        Object.getOwnPropertyNames(ctor.prototype).forEach(function (name) {
            var dtor = Object.getOwnPropertyDescriptor(ctor.prototype, name);
            if (dtor && typeof dtor.value === "function") {
                traceable_1.traceable(flag)(ctor.prototype, name);
            }
        });
        Object.getOwnPropertyNames(ctor).forEach(function (name) {
            var dtor = Object.getOwnPropertyDescriptor(ctor, name);
            if (dtor && typeof dtor.value === "function") {
                traceable_1.traceable(flag)(ctor, name);
            }
        });
    };
}
exports.default = trace;
//# sourceMappingURL=trace.js.map