'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var readline = _interopDefault(require('readline'));

//     
var channel = (function () {
  var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Infinity;

  var releaseRequest = function releaseRequest() {};
  var releaseResponse = function releaseResponse() {};
  //Calling request will return a new promise that's primed to resolve with the arguments of respond when next called
  var request = function request() {
    var debug = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

    var lastAnswer = void 0;
    if (limit < 1) {
      return Promise.resolve(lastAnswer);
    }
    limit--;
    setTimeout(releaseResponse);
    var returnPromise = new Promise(function (outerResolve) {
      releaseRequest = function releaseRequest(answer) {
        var returnPromiseB = new Promise(function (innerResolve) {
          outerResolve(answer);
          releaseResponse = function releaseResponse() {
            return innerResolve(debug);
          };
          return releaseResponse;
        });
        return returnPromiseB;
      };
      return releaseRequest;
    });
    return returnPromise;
  };
  //Calling respond will resolve the promise most recently created by calling request.
  //It returns a promise that will be resolved after the next call to request creates a new promise.
  var respond = function respond(answer) {
    return releaseRequest(answer);
  };
  return [request, respond];
});

var asyncIterator = function (iterable) {
  if (typeof Symbol === "function") {
    if (Symbol.asyncIterator) {
      var method = iterable[Symbol.asyncIterator];
      if (method != null) return method.call(iterable);
    }

    if (Symbol.iterator) {
      return iterable[Symbol.iterator]();
    }
  }

  throw new TypeError("Object is not async iterable");
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();



var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};































var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

//     
var map = (function (iterator, mapper) {
  var newGenerator = function () {
    var _ref = asyncGenerator.wrap( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, item;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 3;
              _iterator = asyncIterator(iterator);

            case 5:
              _context.next = 7;
              return asyncGenerator.await(_iterator.next());

            case 7:
              _step = _context.sent;
              _iteratorNormalCompletion = _step.done;
              _context.next = 11;
              return asyncGenerator.await(_step.value);

            case 11:
              _value = _context.sent;

              if (_iteratorNormalCompletion) {
                _context.next = 21;
                break;
              }

              item = _value;
              _context.next = 16;
              return asyncGenerator.await(mapper(item));

            case 16:
              _context.next = 18;
              return _context.sent;

            case 18:
              _iteratorNormalCompletion = true;
              _context.next = 5;
              break;

            case 21:
              _context.next = 27;
              break;

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](3);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 27:
              _context.prev = 27;
              _context.prev = 28;

              if (!(!_iteratorNormalCompletion && _iterator.return)) {
                _context.next = 32;
                break;
              }

              _context.next = 32;
              return asyncGenerator.await(_iterator.return());

            case 32:
              _context.prev = 32;

              if (!_didIteratorError) {
                _context.next = 35;
                break;
              }

              throw _iteratorError;

            case 35:
              return _context.finish(32);

            case 36:
              return _context.finish(27);

            case 37:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 23, 27, 37], [28,, 32, 36]]);
    }));

    return function newGenerator() {
      return _ref.apply(this, arguments);
    };
  }();
  return newGenerator();
});

var _this = undefined;

//     
/*eslint no-console: "off"*/
var createPassThrought = (function () {
  for (var _len = arguments.length, targets = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    targets[_key - 1] = arguments[_key];
  }

  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : console.log;
  return function () {
    for (var _len2 = arguments.length, programs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      programs[_key2] = arguments[_key2];
    }

    var _loop = function _loop(program) {
      asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _value, output, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _target;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context.prev = 3;
                _iterator2 = asyncIterator(program);

              case 5:
                _context.next = 7;
                return _iterator2.next();

              case 7:
                _step2 = _context.sent;
                _iteratorNormalCompletion2 = _step2.done;
                _context.next = 11;
                return _step2.value;

              case 11:
                _value = _context.sent;

                if (_iteratorNormalCompletion2) {
                  _context.next = 36;
                  break;
                }

                output = _value;
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context.prev = 17;

                for (_iterator3 = targets[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  _target = _step3.value;

                  _target(output);
                }
                _context.next = 25;
                break;

              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](17);
                _didIteratorError3 = true;
                _iteratorError3 = _context.t0;

              case 25:
                _context.prev = 25;
                _context.prev = 26;

                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }

              case 28:
                _context.prev = 28;

                if (!_didIteratorError3) {
                  _context.next = 31;
                  break;
                }

                throw _iteratorError3;

              case 31:
                return _context.finish(28);

              case 32:
                return _context.finish(25);

              case 33:
                _iteratorNormalCompletion2 = true;
                _context.next = 5;
                break;

              case 36:
                _context.next = 42;
                break;

              case 38:
                _context.prev = 38;
                _context.t1 = _context["catch"](3);
                _didIteratorError2 = true;
                _iteratorError2 = _context.t1;

              case 42:
                _context.prev = 42;
                _context.prev = 43;

                if (!(!_iteratorNormalCompletion2 && _iterator2.return)) {
                  _context.next = 47;
                  break;
                }

                _context.next = 47;
                return _iterator2.return();

              case 47:
                _context.prev = 47;

                if (!_didIteratorError2) {
                  _context.next = 50;
                  break;
                }

                throw _iteratorError2;

              case 50:
                return _context.finish(47);

              case 51:
                return _context.finish(42);

              case 52:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this, [[3, 38, 42, 52], [17, 21, 25, 33], [26,, 28, 32], [43,, 47, 51]]);
      }))();
    };

    //targets[0] = targets[0] || console.log;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = programs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var program = _step.value;

        _loop(program);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };
});

var _this$1 = undefined;

//     
var composeAsyncTransformer = (function (current) {
  var pre = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (_) {
    return _;
  };
  return asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = current;
            _context.next = 3;
            return pre.apply(undefined, _args);

          case 3:
            _context.t1 = _context.sent;
            _context.next = 6;
            return (0, _context.t0)(_context.t1);

          case 6:
            return _context.abrupt("return", _context.sent);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, _this$1);
  }));
});

//     
var composePrograms = (function () {
  for (var _len = arguments.length, programs = Array(_len), _key = 0; _key < _len; _key++) {
    programs[_key] = arguments[_key];
  }

  return function (initialRequest) {
    var _programs$pop = programs.pop(),
        _programs$pop2 = slicedToArray(_programs$pop, 4),
        lastProgram = _programs$pop2[0],
        lastInit = _programs$pop2[1],
        lastA = _programs$pop2[2],
        lastB = _programs$pop2[3];

    var request = initialRequest;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = programs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var output = _step.value;

        var program = void 0,
            init = void 0,
            a = void 0,
            b = void 0;
        if (typeof output === "function") {
          program = output;
          a = b = function b($) {
            return $;
          };
        } else {
          program = output[0];
          init = output[1];
          a = output[2];
          b = output[3];
        }

        var _channel = channel(),
            _channel2 = slicedToArray(_channel, 2),
            requestNext = _channel2[0],
            respond = _channel2[1];

        createPassThrought(program(init, composeAsyncTransformer(a, request)), composeAsyncTransformer(respond, b));
        request = requestNext;
      }
      //handle last
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return map(lastProgram(lastInit, composeAsyncTransformer(lastA, request)), lastB);
  };
});

var _this$2 = undefined;

//     
var forEach = (function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(iterator, handler) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, item;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 3;
            _iterator = asyncIterator(iterator);

          case 5:
            _context.next = 7;
            return _iterator.next();

          case 7:
            _step = _context.sent;
            _iteratorNormalCompletion = _step.done;
            _context.next = 11;
            return _step.value;

          case 11:
            _value = _context.sent;

            if (_iteratorNormalCompletion) {
              _context.next = 19;
              break;
            }

            item = _value;
            _context.next = 16;
            return handler(item);

          case 16:
            _iteratorNormalCompletion = true;
            _context.next = 5;
            break;

          case 19:
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](3);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 25:
            _context.prev = 25;
            _context.prev = 26;

            if (!(!_iteratorNormalCompletion && _iterator.return)) {
              _context.next = 30;
              break;
            }

            _context.next = 30;
            return _iterator.return();

          case 30:
            _context.prev = 30;

            if (!_didIteratorError) {
              _context.next = 33;
              break;
            }

            throw _iteratorError;

          case 33:
            return _context.finish(30);

          case 34:
            return _context.finish(25);

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, _this$2, [[3, 21, 25, 35], [26,, 30, 34]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

//     
var filter = (function (iterator, filterer) {
  var newGenerator = function () {
    var _ref = asyncGenerator.wrap( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, item;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 3;
              _iterator = asyncIterator(iterator);

            case 5:
              _context.next = 7;
              return asyncGenerator.await(_iterator.next());

            case 7:
              _step = _context.sent;
              _iteratorNormalCompletion = _step.done;
              _context.next = 11;
              return asyncGenerator.await(_step.value);

            case 11:
              _value = _context.sent;

              if (_iteratorNormalCompletion) {
                _context.next = 22;
                break;
              }

              item = _value;
              _context.next = 16;
              return asyncGenerator.await(filterer(item));

            case 16:
              if (!_context.sent) {
                _context.next = 19;
                break;
              }

              _context.next = 19;
              return item;

            case 19:
              _iteratorNormalCompletion = true;
              _context.next = 5;
              break;

            case 22:
              _context.next = 28;
              break;

            case 24:
              _context.prev = 24;
              _context.t0 = _context["catch"](3);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 28:
              _context.prev = 28;
              _context.prev = 29;

              if (!(!_iteratorNormalCompletion && _iterator.return)) {
                _context.next = 33;
                break;
              }

              _context.next = 33;
              return asyncGenerator.await(_iterator.return());

            case 33:
              _context.prev = 33;

              if (!_didIteratorError) {
                _context.next = 36;
                break;
              }

              throw _iteratorError;

            case 36:
              return _context.finish(33);

            case 37:
              return _context.finish(28);

            case 38:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 24, 28, 38], [29,, 33, 37]]);
    }));

    return function newGenerator() {
      return _ref.apply(this, arguments);
    };
  }();
  return newGenerator();
});

//     
var reduce = (function (iterator, reducer, initial) {
  var condition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {
    return false;
  };
  var resetInitial = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {
    return initial;
  };

  var newGenerator = function () {
    var _ref = asyncGenerator.wrap( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, item;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 3;
              _iterator = asyncIterator(iterator);

            case 5:
              _context.next = 7;
              return asyncGenerator.await(_iterator.next());

            case 7:
              _step = _context.sent;
              _iteratorNormalCompletion = _step.done;
              _context.next = 11;
              return asyncGenerator.await(_step.value);

            case 11:
              _value = _context.sent;

              if (_iteratorNormalCompletion) {
                _context.next = 24;
                break;
              }

              item = _value;
              _context.next = 16;
              return asyncGenerator.await(reducer(item, initial));

            case 16:
              initial = _context.sent;

              if (!condition(item, initial)) {
                _context.next = 21;
                break;
              }

              _context.next = 20;
              return initial;

            case 20:
              initial = resetInitial(item, initial);

            case 21:
              _iteratorNormalCompletion = true;
              _context.next = 5;
              break;

            case 24:
              _context.next = 30;
              break;

            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](3);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 30:
              _context.prev = 30;
              _context.prev = 31;

              if (!(!_iteratorNormalCompletion && _iterator.return)) {
                _context.next = 35;
                break;
              }

              _context.next = 35;
              return asyncGenerator.await(_iterator.return());

            case 35:
              _context.prev = 35;

              if (!_didIteratorError) {
                _context.next = 38;
                break;
              }

              throw _iteratorError;

            case 38:
              return _context.finish(35);

            case 39:
              return _context.finish(30);

            case 40:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 26, 30, 40], [31,, 35, 39]]);
    }));

    return function newGenerator() {
      return _ref.apply(this, arguments);
    };
  }();
  return newGenerator();
});

//     
var pause = (function () {
  var milliseconds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  return new Promise(function (resolve) {
    return setTimeout(function () {
      return resolve(value);
    }, milliseconds);
  });
});

//     
var createQueue = (function () {
  for (var _len = arguments.length, initial = Array(_len), _key = 0; _key < _len; _key++) {
    initial[_key] = arguments[_key];
  }

  var push = function push(item) {
    return initial.push(item);
  };
  var newGenerator = function () {
    var _ref = asyncGenerator.wrap( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              

              if (!initial.length) {
                _context.next = 8;
                break;
              }

              _context.next = 4;
              return asyncGenerator.await(initial.shift());

            case 4:
              _context.next = 6;
              return _context.sent;

            case 6:
              _context.next = 8;
              break;

            case 8:
              _context.next = 0;
              break;

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function newGenerator() {
      return _ref.apply(this, arguments);
    };
  }();
  return [newGenerator(), push];
});

//     
var createStack = (function () {
  for (var _len = arguments.length, initial = Array(_len), _key = 0; _key < _len; _key++) {
    initial[_key] = arguments[_key];
  }

  var push = function push(item) {
    return initial.push(item);
  };
  var newGenerator = function () {
    var _ref = asyncGenerator.wrap( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              

              if (!initial.length) {
                _context.next = 8;
                break;
              }

              _context.next = 4;
              return asyncGenerator.await(initial.pop());

            case 4:
              _context.next = 6;
              return _context.sent;

            case 6:
              _context.next = 8;
              break;

            case 8:
              _context.next = 0;
              break;

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function newGenerator() {
      return _ref.apply(this, arguments);
    };
  }();
  return [newGenerator(), push];
});

var _this$3 = undefined;

//     
var createProgramQueue = (function () {
  var _createQueue = createQueue(),
      _createQueue2 = slicedToArray(_createQueue, 2),
      iterator = _createQueue2[0],
      push = _createQueue2[1];

  var render = createPassThrought(push);
  var listen = function () {
    var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      for (var _len = arguments.length, programs = Array(_len), _key = 0; _key < _len; _key++) {
        programs[_key] = arguments[_key];
      }

      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, program;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 3;

              for (_iterator = programs[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                program = _step.value;

                render(program);
              }
              _context.next = 11;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](3);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 11:
              _context.prev = 11;
              _context.prev = 12;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 14:
              _context.prev = 14;

              if (!_didIteratorError) {
                _context.next = 17;
                break;
              }

              throw _iteratorError;

            case 17:
              return _context.finish(14);

            case 18:
              return _context.finish(11);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this$3, [[3, 7, 11, 19], [12,, 14, 18]]);
    }));

    return function listen() {
      return _ref.apply(this, arguments);
    };
  }();
  return [iterator, listen];
});

var _this$4 = undefined;

//     
var index = (function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(iterator, number) {
    var skip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    var result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, output;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 4;
            _iterator = asyncIterator(iterator);

          case 6:
            _context.next = 8;
            return _iterator.next();

          case 8:
            _step = _context.sent;
            _iteratorNormalCompletion = _step.done;
            _context.next = 12;
            return _step.value;

          case 12:
            _value = _context.sent;

            if (_iteratorNormalCompletion) {
              _context.next = 25;
              break;
            }

            output = _value;

            if (skip) {
              _context.next = 21;
              break;
            }

            if (!(result.length === number)) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", result);

          case 18:
            result.push(output);
            _context.next = 22;
            break;

          case 21:
            skip--;

          case 22:
            _iteratorNormalCompletion = true;
            _context.next = 6;
            break;

          case 25:
            _context.next = 31;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 31:
            _context.prev = 31;
            _context.prev = 32;

            if (!(!_iteratorNormalCompletion && _iterator.return)) {
              _context.next = 36;
              break;
            }

            _context.next = 36;
            return _iterator.return();

          case 36:
            _context.prev = 36;

            if (!_didIteratorError) {
              _context.next = 39;
              break;
            }

            throw _iteratorError;

          case 39:
            return _context.finish(36);

          case 40:
            return _context.finish(31);

          case 41:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, _this$4, [[4, 27, 31, 41], [32,, 36, 40]]);
  }));

  return function (_x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var _this$5 = undefined;

//     
var _while = (function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(iterator) {
    var accept = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
      return true;
    };
    var skip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    var result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, output;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 4;
            _iterator = asyncIterator(iterator);

          case 6:
            _context.next = 8;
            return _iterator.next();

          case 8:
            _step = _context.sent;
            _iteratorNormalCompletion = _step.done;
            _context.next = 12;
            return _step.value;

          case 12:
            _value = _context.sent;

            if (_iteratorNormalCompletion) {
              _context.next = 25;
              break;
            }

            output = _value;

            if (skip) {
              _context.next = 21;
              break;
            }

            if (accept(output)) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", result);

          case 18:
            result.push(output);
            _context.next = 22;
            break;

          case 21:
            skip--;

          case 22:
            _iteratorNormalCompletion = true;
            _context.next = 6;
            break;

          case 25:
            _context.next = 31;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 31:
            _context.prev = 31;
            _context.prev = 32;

            if (!(!_iteratorNormalCompletion && _iterator.return)) {
              _context.next = 36;
              break;
            }

            _context.next = 36;
            return _iterator.return();

          case 36:
            _context.prev = 36;

            if (!_didIteratorError) {
              _context.next = 39;
              break;
            }

            throw _iteratorError;

          case 39:
            return _context.finish(36);

          case 40:
            return _context.finish(31);

          case 41:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, _this$5, [[4, 27, 31, 41], [32,, 36, 40]]);
  }));

  return function (_x3) {
    return _ref.apply(this, arguments);
  };
})();

//     
var identity = (function () {
  var _ref = asyncGenerator.wrap( /*#__PURE__*/regeneratorRuntime.mark(function _callee(delay, request) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            

            _context.next = 3;
            return asyncGenerator.await(pause(delay));

          case 3:
            _context.next = 5;
            return asyncGenerator.await(request());

          case 5:
            _context.next = 7;
            return _context.sent;

          case 7:
            _context.next = 0;
            break;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

//     
var continuousOutput = (function () {
  var _ref = asyncGenerator.wrap( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sample) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            

            _context.next = 3;
            return asyncGenerator.await(sample());

          case 3:
            _context.next = 5;
            return _context.sent;

          case 5:
            _context.next = 0;
            break;

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();

var _this$6 = undefined;

//     
var tee = (function () {
  for (var _len = arguments.length, programs = Array(_len), _key = 0; _key < _len; _key++) {
    programs[_key] = arguments[_key];
  }

  var ps = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = programs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var output = _step.value;

      var program = void 0,
          init = void 0,
          a = void 0,
          b = void 0;
      if (typeof output === "function") {
        program = output;
        a = b = function b($) {
          return $;
        };
      } else {
        program = output[0];
        init = output[1];
        a = output[2];
        b = output[3];
      }

      var _channel = channel(),
          _channel2 = slicedToArray(_channel, 2),
          request = _channel2[0],
          respond = _channel2[1];

      ps.push({
        init: init,
        program: program,
        request: composeAsyncTransformer(b, request),
        respond: composeAsyncTransformer(respond, a)
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return function () {
    var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(program) {
      var responds, passthrough;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              responds = ps.map(function (_ref2) {
                var respond = _ref2.respond;
                return respond;
              });
              passthrough = createPassThrought.apply(undefined, toConsumableArray(responds));

              passthrough(program);
              return _context.abrupt("return", ps.map(function (_ref3) {
                var init = _ref3.init,
                    program = _ref3.program,
                    request = _ref3.request;
                return program(init, request);
              }));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this$6);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
});

//Uncodumented browser shim
var readPrompt = {
  createInterface: function createInterface() {
    return {
      question: function () {
        var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(q, callback) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  callback(window.prompt(q));

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function question(_x, _x2) {
          return _ref.apply(this, arguments);
        }

        return question;
      }()
    };
  }
};

var _this$7 = undefined;

//     
/*global process */
var rl = void 0;
if (typeof process !== "undefined") {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
} else {
  rl = readPrompt.createInterface();
}
var get$1 = function get$$1() {
  return new Promise(function (resolve) {
    return rl.question(">", function (answer) {
      return resolve(answer);
    });
  });
};
var console$1 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  for (var _len = arguments.length, inputs = Array(_len), _key = 0; _key < _len; _key++) {
    inputs[_key] = arguments[_key];
  }

  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, input;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 4;
          _iterator = inputs[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 17;
            break;
          }

          input = _step.value;
          _context.t0 = input;
          _context.next = 11;
          return get$1();

        case 11:
          _context.t1 = _context.sent;
          _context.next = 14;
          return (0, _context.t0)(_context.t1);

        case 14:
          _iteratorNormalCompletion = true;
          _context.next = 6;
          break;

        case 17:
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t2 = _context["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context.t2;

        case 23:
          _context.prev = 23;
          _context.prev = 24;

          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }

        case 26:
          _context.prev = 26;

          if (!_didIteratorError) {
            _context.next = 29;
            break;
          }

          throw _iteratorError;

        case 29:
          return _context.finish(26);

        case 30:
          return _context.finish(23);

        case 31:
          _context.next = 0;
          break;

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, _this$7, [[4, 19, 23, 31], [24,, 26, 30]]);
}));

var _this$8 = undefined;

//     
/*global process */
var pipe = (function () {
  var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(opts) {
    for (var _len = arguments.length, inputs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      inputs[_key - 1] = arguments[_key];
    }

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // let options = {};
            // if (typeof opts === "object") {
            //     options = Object.assign(options, opts);
            // } else {
            //     inputs.unshift(opts);
            // }
            if (typeof process !== "undefined") {
              process.stdin.resume();
              //process.setEncoding("utf8");
              process.stdin.on("data", function () {
                var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(answer) {
                  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, input;

                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _iteratorNormalCompletion = true;
                          _didIteratorError = false;
                          _iteratorError = undefined;
                          _context.prev = 3;
                          _iterator = inputs[Symbol.iterator]();

                        case 5:
                          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 12;
                            break;
                          }

                          input = _step.value;
                          _context.next = 9;
                          return input(answer);

                        case 9:
                          _iteratorNormalCompletion = true;
                          _context.next = 5;
                          break;

                        case 12:
                          _context.next = 18;
                          break;

                        case 14:
                          _context.prev = 14;
                          _context.t0 = _context["catch"](3);
                          _didIteratorError = true;
                          _iteratorError = _context.t0;

                        case 18:
                          _context.prev = 18;
                          _context.prev = 19;

                          if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                          }

                        case 21:
                          _context.prev = 21;

                          if (!_didIteratorError) {
                            _context.next = 24;
                            break;
                          }

                          throw _iteratorError;

                        case 24:
                          return _context.finish(21);

                        case 25:
                          return _context.finish(18);

                        case 26:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, _this$8, [[3, 14, 18, 26], [19,, 21, 25]]);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, _this$8);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();

/* eslint-disable */
/**
 * @typedef {Function} PairedRequest
 * @description a function that receives it's response from a paired PairedRespond function
 * @return {Promise<*>} response from respond reunction
 */

/**
 * @typedef {Function} PairedRespond
 * @description a function that sends it's input to a paired PairedRequest function
 * @param {*} response - response for request function
 */

/**
 * @typedef {Array} AsyncPair
 * @description a pair of paired PairedRequest and PairedRespond functions
 * @property {PairedRequest} 0 - request function
 * @property {PairedRespond} 1 - respond function
 */

/**
 * @typedef {Function} AsyncTransformer
 * @description stateless asynchronous function that transforms input without side effects
 * @param {*} input - input
 * @return {*} transformed input
 */

/**
 * @typedef {Function} Program
 * @description an iteractive program
 * @param {*} init
 * @param {PairedRequest} request - request function for input
 * @return {AsynchronousIterator} asynchronous iterator result
 */

/**
 * @typedef {Function} AsyncRenderFunction
 * @description a function that renders values from a given [Asynchronous] Iterator
 * @param {AsynchronousIterator} program_return;
 */

/**
 * @typedef {Array} PushPair
 * @description an iterator and a paired function to add to it
 * @property {AsynchornousIterator} 0 - iterator
 * @property {Function} 1 - function used to add to iterator
 */

/**
 * @name channel
 * @description creates a pair of asynchronous functions used to transfer objects between programs
 * @returns {AsyncPair} array of paired functions
 * @example
 * import {channel} from "async-endpoint";
 * const [request, respond] = channel();
 * const main = async()=>{
 *      setTimeout(()=>{
 *          respond("hello");
 *      })
 *      console.log(await request());
 * }
 * main();
 * //logs "hello"
 */

exports.channel = channel;
exports.composeProgram = composePrograms;
exports.map = map;
exports.forEach = forEach;
exports.filter = filter;
exports.reduce = reduce;
exports.pause = pause;
exports.composeAsyncTransformer = composeAsyncTransformer;
exports.createQueue = createQueue;
exports.createStack = createStack;
exports.programQueue = createProgramQueue;
exports.programStack = createProgramQueue;
exports.take = index;
exports.takeWhile = _while;
exports.identity = identity;
exports.continuousOutput = continuousOutput;
exports.renderer = createPassThrought;
exports.tee = tee;
exports.inputConsole = console$1;
exports.inputPipe = pipe;
