"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var index_1 = require("../lib/index");
var index_2 = require("../lib/index");
require("mocha");
describe("trace", function () {
    it("should exist", function () {
        chai_1.expect(index_1.trace).to.not.be.an("undefined");
    });
    it("should be a function", function () {
        chai_1.expect(index_1.trace).to.be.a("function");
    });
});
describe("traceable", function () {
    it("should exist", function () {
        chai_1.expect(index_2.traceable).to.not.be.an("undefined");
    });
    it("should be a function", function () {
        chai_1.expect(index_2.traceable).to.be.a("function");
    });
});
describe("trace", function () {
    /** TODO: fix the @trace decorator! */
});
describe("traceable", function () {
    before(function () {
        global.TRACE = true;
    });
    after(function () {
        delete global.TRACE;
    });
    afterEach(function () {
        delete global.CONSOLE;
    });

    var Q = function () {
        function Q() {
            _classCallCheck(this, Q);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            this.args = args;
        }

        _createClass(Q, [{
            key: "add1",
            value: function add1() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                return this.args.concat(args);
            }
        }, {
            key: "add2",
            value: function add2() {
                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    args[_key3] = arguments[_key3];
                }

                return this.args.concat(args);
            }
        }]);

        return Q;
    }();

    __decorate([index_2.traceable, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", Array)], Q.prototype, "add1", null);
    __decorate([index_2.traceable(true), __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", Array)], Q.prototype, "add2", null);
    it("should decorate Q.add1", function () {
        chai_1.expect(Q.prototype.add1).to.be.a("function");
    });
    it("should log Q('a').add('b', 'c') ", function () {
        global.CONSOLE = {
            group: function group(fqn) {
                chai_1.expect(fqn).to.eq("Q.add1");
            },
            debug: function debug() {
                if (this.debug_n === this.debug_0) {
                    this.debug_n = this.debug_1;
                }
                if (this.debug_n === undefined) {
                    this.debug_n = this.debug_0;
                }
                this.debug_n.apply(this, arguments);
            },
            debug_0: function debug_0(b, c) {
                chai_1.expect(b).to.eq("b");
                chai_1.expect(c).to.eq("c");
            },
            debug_1: function debug_1(result) {
                chai_1.expect(result.length).to.eq(3);
                chai_1.expect(result).to.have.members(["a", "b", "c"]);
            },
            groupEnd: function groupEnd() {
                chai_1.expect(arguments.length).to.eq(0);
            }
        };
        chai_1.expect(new Q("a").add1("b", "c")).to.have.members(["a", "b", "c"]);
    });
    it("should decorate Q.add2", function () {
        chai_1.expect(Q.prototype.add2).to.be.a("function");
    });
    it("should log Q('x').add('y', 'z')", function () {
        global.CONSOLE = {
            group: function group(fqn) {
                chai_1.expect(fqn).to.eq("Q.add2");
            },
            debug: function debug() {
                if (this.debug_n === this.debug_0) {
                    this.debug_n = this.debug_1;
                }
                if (this.debug_n === undefined) {
                    this.debug_n = this.debug_0;
                }
                this.debug_n.apply(this, arguments);
            },
            debug_0: function debug_0(y, z) {
                chai_1.expect(y).to.eq("y");
                chai_1.expect(z).to.eq("z");
            },
            debug_1: function debug_1(result) {
                chai_1.expect(result.length).to.eq(3);
                chai_1.expect(result).to.have.members(["x", "y", "z"]);
            },
            groupEnd: function groupEnd() {
                chai_1.expect(arguments.length).to.eq(0);
            }
        };
        chai_1.expect(new Q("x").add2("y", "z")).to.have.members(["x", "y", "z"]);
    });
});
//# sourceMappingURL=test.js.map