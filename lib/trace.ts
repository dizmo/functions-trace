/* tslint:disable:ban-types */
/* tslint:disable:only-arrow-functions */
/* tslint:disable:space-before-function-paren */

import { traceable as _traceable } from "./traceable";

export function trace(
    flag: boolean): Function;
export function trace(
    ctor: Function): void;
export function trace(
    arg: boolean | Function): Function | void {
    if (typeof arg === "boolean") {
        return _trace(arg);
    } else {
        _trace(true)(arg as Function);
    }
}

function _trace(flag: boolean): Function {
    return function (ctor: Function) {
        Object.keys(ctor.prototype).forEach((key: string) => {
            const dtor = Object.getOwnPropertyDescriptor(
                ctor.prototype, key,
            );
            if (dtor && typeof dtor.value === "function") {
                _traceable(flag)(ctor.prototype, key);
            }
        });
        Object.keys(ctor).forEach((key: string) => {
            const dtor = Object.getOwnPropertyDescriptor(
                ctor, key,
            );
            if (dtor && typeof dtor.value === "function") {
                _traceable(flag)(ctor, key);
            }
        });
    };
}

export default trace;
