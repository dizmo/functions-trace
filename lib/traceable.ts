/* tslint:disable:ban-types */
/* tslint:disable:no-string-literal */
/* tslint:disable:only-arrow-functions */
/* tslint:disable:trailing-comma */
/* tslint:disable:variable-name */

import { Global } from "./global";
declare const global: Global;

export function traceable(
    flag: boolean): Function;
export function traceable(
    target: any, key: string, dtor?: PropertyDescriptor): void;
export function traceable(
    arg: boolean | any, key?: string, dtor?: PropertyDescriptor,
): Function | void {
    if (typeof arg === "boolean") {
        return _traceable(arg);
    } else {
        _traceable(true)(arg as any, key, dtor);
    }
}

function _traceable(
    flag: boolean,
): Function {
    return function(
        target: any, key: string, dtor?: PropertyDescriptor,
    ) {
        const wrap = (
            fn: Function, callback: Function,
        ) => {
            if (!flag) {
                (fn as any)["_traced"] = false;
            } else {
                if ((fn as any)["_traced"] === undefined) {
                    (fn as any)["_traced"] = true;

                    const tn: Function = function(
                        this: any, ...args: any[]
                    ) {
                        const T = global["TRACE"];
                        if (T !== false && T) {
                            const _console = global["CONSOLE"]
                                ? global["CONSOLE"] as Console
                                : console;

                            const name =
                                target.constructor &&
                                target.constructor.name || "@";

                            setTimeout(() => {
                                _console.group(`${name}.${key}`);
                                if (args.length > 0) {
                                    _console.debug(...args);
                                }
                                if (result !== undefined) {
                                    _console.debug(result);
                                }
                            }, T || 0);

                            const result = fn.apply(this, args);

                            setTimeout(() => {
                                _console.groupEnd();
                            }, T || 0);

                            return result;
                        } else {
                            return fn.apply(this, args);
                        }
                    };
                    for (const el in fn) {
                        if (fn.hasOwnProperty(el)) {
                            (tn as any)[el] = (fn as any)[el];
                        }
                    }
                    callback(tn);
                }
            }
        };
        if (dtor) {
            if (typeof dtor.value === "function") {
                wrap(dtor.value, (tn: Function) => {
                    dtor.value = tn;
                });
            } else {
                if (typeof dtor.get === "function") {
                    wrap(dtor.get, (tn: Function) => {
                        dtor.get = tn as any;
                    });
                }
                if (typeof dtor.set === "function") {
                    wrap(dtor.set, (tn: Function) => {
                        dtor.set = tn as any;
                    });
                }
            }
        } else {
            wrap(target[key], (tn: Function) => {
                target[key] = tn;
            });
        }
    };
}

export default traceable;
