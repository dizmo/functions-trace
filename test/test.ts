import { expect } from "chai";
import { trace } from "../lib/index";
import { traceable } from "../lib/index";

import "mocha";

import { Global } from "../lib/global";
declare const global: Global;

describe("trace", () => {
    it("should exist", () => {
        expect(trace).to.not.be.an("undefined");
    });
    it("should be a function", () => {
        expect(trace).to.be.a("function");
    });
});

describe("traceable", () => {
    it("should exist", () => {
        expect(traceable).to.not.be.an("undefined");
    });
    it("should be a function", () => {
        expect(traceable).to.be.a("function");
    });
});

describe("traceable", () => {
    before(() => {
        global.TRACE = true;
    });
    after(() => {
        delete global.TRACE;
    });
    afterEach(() => {
        delete global.CONSOLE;
    });

    class Q {
        private args: any[];
        constructor(...args: any[]) {
            this.args = args;
        }
        @traceable
        public add1(...args: any[]): any[] {
            return this.args.concat(args);
        }
        @traceable(true)
        public add2(...args: any[]): any[] {
            return this.args.concat(args);
        }
    }

    it("should decorate Q.add1", () => {
        expect(Q.prototype.add1).to.be.a("function");
    });
    it("should log Q('a').add('b', 'c') ", () => {
        global.CONSOLE = {
            group(fqn: string) {
                expect(fqn).to.eq("Q.add1");
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
        expect(new Q("a").add1("b", "c")).to.have.members([
            "a", "b", "c",
        ]);
    });

    it("should decorate Q.add2", () => {
        expect(Q.prototype.add2).to.be.a("function");
    });
    it("should log Q('x').add('y', 'z')", () => {
        global.CONSOLE = {
            group(fqn: string) {
                expect(fqn).to.eq("Q.add2");
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
            debug_0(y: string, z: string) {
                expect(y).to.eq("y");
                expect(z).to.eq("z");
            },
            debug_1(result: any) {
                expect(result.length).to.eq(3);
                expect(result).to.have.members([
                    "x", "y", "z",
                ]);
            },
            groupEnd(...args: any[]) {
                expect(args.length).to.eq(0);
            },
        };
        expect(new Q("x").add2("y", "z")).to.have.members([
            "x", "y", "z",
        ]);
    });
});
