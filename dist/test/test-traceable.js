"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = void 0 && (void 0).__metadata || function (k, v) {
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var chai_1 = require("chai");

var index_1 = require("../lib/index");

require("mocha");

describe("traceable", function () {
  it("should exist", function () {
    chai_1.expect(index_1.traceable).to.not.be.an("undefined");
  });
  it("should be a function", function () {
    chai_1.expect(index_1.traceable).to.be.a("function");
  });
});
describe("traceable", function () {
  var QClass;

  var TracedQ = function TracedQ() {
    var Q =
    /*#__PURE__*/
    function () {
      function Q() {
        _classCallCheck(this, Q);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        this.args = args;
      }

      _createClass(Q, [{
        key: "add1",
        value: function add1() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return this.args.concat(args);
        }
      }, {
        key: "add2",
        value: function add2() {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return this.args.concat(args);
        }
      }]);

      return Q;
    }();

    __decorate([index_1.traceable(true), __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", Array)], Q.prototype, "add1", null);

    __decorate([index_1.traceable(false), __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", Array)], Q.prototype, "add2", null);

    return Q;
  };

  before(function () {
    global.TRACE = true;
  });
  after(function () {
    delete global.TRACE;
  });
  beforeEach(function () {
    QClass = TracedQ();
  });
  afterEach(function () {
    delete global.CONSOLE;
  });
  it("should decorate Q.add1", function () {
    chai_1.expect(QClass.prototype.add1).to.be.a("function");
  });
  it("should log Q('a').add('b', 'c') ", function () {
    global.CONSOLE = {
      group: function group(fqn) {
        chai_1.expect(fqn).to.eq("Q.add1");
        chai_1.expect((arguments.length <= 1 ? 0 : arguments.length - 1) > 0);
        chai_1.expect(arguments.length <= 1 ? undefined : arguments[1]).to.eq("[");
        chai_1.expect(arguments.length <= 2 ? undefined : arguments[2]).to.be.a("number");
        chai_1.expect(arguments.length <= 3 ? undefined : arguments[3]).to.eq("ms");
        chai_1.expect(arguments.length <= 4 ? undefined : arguments[4]).to.eq("]");
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
    chai_1.expect(new QClass("a").add1("b", "c")).to.have.members(["a", "b", "c"]);
  });
  it("should decorate Q.add2", function () {
    chai_1.expect(QClass.prototype.add2).to.be.a("function");
  });
  it("should log Q('x').add('y', 'z')", function () {
    global.CONSOLE = {
      group: function group(fqn) {
        chai_1.expect(true).to.eq(false);
      },
      groupEnd: function groupEnd() {
        chai_1.expect(true).to.eq(false);
      }
    };
    chai_1.expect(new QClass("x").add2("y", "z")).to.have.members(["x", "y", "z"]);
  });
});
//# sourceMappingURL=test-traceable.js.map