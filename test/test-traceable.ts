import { expect } from "chai";
import { traceable } from "../lib/index";

import "mocha";

import { Global } from "../lib/global";
declare const global: Global;

describe("traceable", () => {
    it("should exist", () => {
        expect(traceable).to.not.be.an("undefined");
    });
    it("should be a function", () => {
        expect(traceable).to.be.a("function");
    });
});
describe("traceable", () => {
    let QClass: any;
    const TracedQ = () => {
        class Q {
            private args: any[];
            constructor(...args: any[]) {
                this.args = args;
            }
            @traceable(true)
            public add1(...args: any[]): any[] {
                return this.args.concat(args);
            }
            @traceable(false)
            public add2(...args: any[]): any[] {
                return this.args.concat(args);
            }
        }
        return Q;
    };
    before(() => {
        global.TRACE = true;
    });
    after(() => {
        delete global.TRACE;
    });
    beforeEach(() => {
        QClass = TracedQ();
    });
    afterEach(() => {
        delete global.CONSOLE;
    });
    it("should decorate Q.add1", () => {
        expect(QClass.prototype.add1).to.be.a("function");
    });
    it("should log Q('a').add('b', 'c') ", () => {
        global.CONSOLE = {
            group(fqn: string, ...args: any[]) {
                expect(fqn).to.eq("Q.add1");
                expect(args.length > 0);
                expect(args[0]).to.eq("[");
                expect(args[1]).to.be.a("number");
                expect(args[2]).to.eq("ms");
                expect(args[3]).to.eq("]");
            },
            debug(...args: any[]) {
                if (this.debug_n === this.debug_0) {
                    this.debug_n = this.debug_1;
                }
                if (this.debug_n === undefined) {
                    this.debug_n = this.debug_0;
                }
                this.debug_n(...args);
            },
            debug_0(b: string, c: string) {
                expect(b).to.eq("b");
                expect(c).to.eq("c");
            },
            debug_1(result: any) {
                expect(result.length).to.eq(3);
                expect(result).to.have.members([
                    "a", "b", "c",
                ]);
            },
            groupEnd(...args: any[]) {
                expect(args.length).to.eq(0);
            },
        };
        expect(new QClass("a").add1("b", "c")).to.have.members([
            "a", "b", "c",
        ]);
    });
    it("should decorate Q.add2", () => {
        expect(QClass.prototype.add2).to.be.a("function");
    });
    it("should log Q('x').add('y', 'z')", () => {
        global.CONSOLE = {
            group(fqn: string, ...args: any[]) {
                expect(true).to.eq(false);
            },
            groupEnd(...args: any[]) {
                expect(true).to.eq(false);
            },
        };
        expect(new QClass("x").add2("y", "z")).to.have.members([
            "x", "y", "z",
        ]);
    });
});
