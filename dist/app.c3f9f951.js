// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Player = function Player(name, image, weapon) {
  var _this = this;

  var lastId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  _classCallCheck(this, Player);

  _defineProperty(this, "generate", function () {
    return {
      id: _this.id,
      name: _this.name,
      image: "<img src=\"".concat(_this.image, "\" alt=\"").concat(_this.name, "\" />"),
      weapon: {
        image: "<img src=\"".concat(_this.weapon, "\" alt=\"\" data-damage=\"10\" />"),
        damage: 10,
        oldWeapon: ""
      },
      lifePoints: 100,
      location: {
        row: 0,
        column: 0
      },
      shield: false
    };
  });

  this.id = lastId + 1;
  this.name = name;
  this.image = image;
  this.weapon = weapon;
} // Generating players with their inital stats
;

var _default = Player;
exports.default = _default;
},{}],"images/cap-avatar.png":[function(require,module,exports) {
module.exports = "/cap-avatar.8b6862e6.png";
},{}],"images/iron-avatar.png":[function(require,module,exports) {
module.exports = "/iron-avatar.6984e017.png";
},{}],"images/space-stone.png":[function(require,module,exports) {
module.exports = "/space-stone.e81f92ef.png";
},{}],"images/power-stone.png":[function(require,module,exports) {
module.exports = "/power-stone.33d3366e.png";
},{}],"images/soul-stone.png":[function(require,module,exports) {
module.exports = "/soul-stone.687ea270.png";
},{}],"images/gauntlet.png":[function(require,module,exports) {
module.exports = "/gauntlet.6f32e825.png";
},{}],"images/barrier.png":[function(require,module,exports) {
module.exports = "/barrier.7f53fc80.png";
},{}],"js/assets.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "capShield", {
  enumerable: true,
  get: function () {
    return _capAvatar.default;
  }
});
Object.defineProperty(exports, "ironman", {
  enumerable: true,
  get: function () {
    return _ironAvatar.default;
  }
});
Object.defineProperty(exports, "weapon0", {
  enumerable: true,
  get: function () {
    return _spaceStone.default;
  }
});
Object.defineProperty(exports, "weapon1", {
  enumerable: true,
  get: function () {
    return _powerStone.default;
  }
});
Object.defineProperty(exports, "weapon2", {
  enumerable: true,
  get: function () {
    return _soulStone.default;
  }
});
Object.defineProperty(exports, "weapon3", {
  enumerable: true,
  get: function () {
    return _gauntlet.default;
  }
});
Object.defineProperty(exports, "barrier", {
  enumerable: true,
  get: function () {
    return _barrier.default;
  }
});
exports.weapons = void 0;

var _capAvatar = _interopRequireDefault(require("../images/cap-avatar.png"));

var _ironAvatar = _interopRequireDefault(require("../images/iron-avatar.png"));

var _spaceStone = _interopRequireDefault(require("../images/space-stone.png"));

var _powerStone = _interopRequireDefault(require("../images/power-stone.png"));

var _soulStone = _interopRequireDefault(require("../images/soul-stone.png"));

var _gauntlet = _interopRequireDefault(require("../images/gauntlet.png"));

var _barrier = _interopRequireDefault(require("../images/barrier.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var weapons = [_soulStone.default, _gauntlet.default];
exports.weapons = weapons;
},{"../images/cap-avatar.png":"images/cap-avatar.png","../images/iron-avatar.png":"images/iron-avatar.png","../images/space-stone.png":"images/space-stone.png","../images/power-stone.png":"images/power-stone.png","../images/soul-stone.png":"images/soul-stone.png","../images/gauntlet.png":"images/gauntlet.png","../images/barrier.png":"images/barrier.png"}],"js/game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assets = require("./assets");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Game = function Game(players) {
  var _this = this;

  _classCallCheck(this, Game);

  _defineProperty(this, "reset", function () {
    document.querySelector("#gameOverModal").classList.remove("open");

    _this.players.map(function (player) {
      document.querySelector("#name".concat(player.id)).innerHTML = player.name;
      document.querySelector("#health".concat(player.id)).innerHTML = player.lifePoints;
      document.querySelector("#weapon".concat(player.id)).innerHTML = player.weapon.image;
      document.querySelector("#damage".concat(player.id)).innerHTML = player.weapon.damage;
      document.querySelector("#shield".concat(player.id)).innerHTML = "Unprotected";
    });
  });

  _defineProperty(this, "newGame", function () {
    _this.reset(); // PLACING BARRIERS 


    for (var i = 0; i < 12; i++) {
      _this.placeItem("barrier", "<img src=".concat(_assets.barrier, " alt=\"\" />"));
    } // SETTING WEAPON DAMAGE AND PLACING ON MAP


    var damage = 10;

    var _iterator = _createForOfIteratorHelper(_assets.weapons),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var weapon = _step.value;
        damage += 10;

        _this.placeItem("weapon", "<img src=".concat(weapon, " alt=\"\" data-damage=\"").concat(damage, "\" />"));
      } // PLACING PLAYERS ON MAP

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    _this.players.map(function (player) {
      _this.placeItem("player", player);
    });

    _this.currentPlayer = _this.players[Math.floor(Math.random() * _this.players.length)];

    _this.detectTurn();
  });

  _defineProperty(this, "placeItem", function (cls, item) {
    var randomSquare = Math.floor(Math.random() * _this.gridSquares.length);
    var _this$gridSquares$ran = _this.gridSquares[randomSquare].dataset,
        column = _this$gridSquares$ran.column,
        row = _this$gridSquares$ran.row;

    var getObstacleDistance = function getObstacleDistance(row, column) {
      var elm = document.querySelector("[data-row=\"".concat(row, "\"][data-column=\"").concat(column, "\"]"));
      var r1 = document.querySelector("[data-row=\"".concat(row - 1, "\"][data-column=\"").concat(column, "\"]"));
      var r2 = document.querySelector("[data-row=\"".concat(row - 2, "\"][data-column=\"").concat(column, "\"]"));
      var r3 = document.querySelector("[data-row=\"".concat(row + 1, "\"][data-column=\"").concat(column, "\"]"));
      var r4 = document.querySelector("[data-row=\"".concat(row + 2, "\"][data-column=\"").concat(column, "\"]"));
      var c1 = document.querySelector("[data-column=\"".concat(column - 1, "\"][data-row=\"").concat(row, "\"]"));
      var c2 = document.querySelector("[data-column=\"".concat(column - 2, "\"][data-row=\"").concat(row, "\"]"));
      var c3 = document.querySelector("[data-column=\"".concat(column + 1, "\"][data-row=\"").concat(row, "\"]"));
      var c4 = document.querySelector("[data-column=\"".concat(column + 2, "\"][data-row=\"").concat(row, "\"]"));
      if (r1 && r1.classList.contains("barrier")) return true;
      if (r2 && r2.classList.contains("barrier")) return true;
      if (r3 && r3.classList.contains("barrier")) return true;
      if (r4 && r4.classList.contains("barrier")) return true;
      if (c1 && c1.classList.contains("barrier")) return true;
      if (c2 && c2.classList.contains("barrier")) return true;
      if (c3 && c3.classList.contains("barrier")) return true;
      if (c4 && c4.classList.contains("barrier")) return true;
      var r1c1 = document.querySelector("[data-row=\"".concat(row + 1, "\"][data-column=\"").concat(column + 1, "\"]"));
      var r2c2 = document.querySelector("[data-row=\"".concat(row - 1, "\"][data-column=\"").concat(column - 1, "\"]"));
      var r3c3 = document.querySelector("[data-row=\"".concat(row - 1, "\"][data-column=\"").concat(column + 1, "\"]"));
      var r4c4 = document.querySelector("[data-row=\"".concat(row + 1, "\"][data-column=\"").concat(column - 1, "\"]"));
      if (r1c1 && r1c1.classList.contains("barrier")) return true;
      if (r2c2 && r2c2.classList.contains("barrier")) return true;
      if (r3c3 && r3c3.classList.contains("barrier")) return true;
      if (r4c4 && r4c4.classList.contains("barrier")) return true;
    };

    var getPlayerDistance = function getPlayerDistance(row, column) {
      if (_this.players[0].location.row > 0) {
        var p1c = +_this.players[0].location.column;
        var p1r = +_this.players[0].location.row;
        var yDistance = Math.abs(p1r - row);
        var xDistance = Math.abs(p1c - column); // Check if P1 is in same column and less than 4 steps away from P2

        if (p1c === column && yDistance <= 4) {
          // Check if there's a barrier between two players
          for (var i = 1; i <= yDistance; i++) {
            if (p1r > row) {
              var y = document.querySelector("[data-row=\"".concat(p1r - i, "\"][data-column=\"").concat(p1c, "\"]"));
              if (y && y.classList.contains("barrier")) return false;
            } else {
              var _y = document.querySelector("[data-row=\"".concat(p1r + i, "\"][data-column=\"").concat(p1c, "\"]"));

              if (_y && _y.classList.contains("barrier")) return false;
            }
          }

          return true;
        } // Check if P1 is in same row and less than 4 steps away from P2


        if (p1r === row && xDistance <= 4) {
          // Check if there's a barrier between two players
          for (var _i = 1; _i <= xDistance; _i++) {
            if (p1c > column) {
              var x = document.querySelector("[data-row=\"".concat(p1r, "\"][data-column=\"").concat(p1c - _i, "\"]"));
              if (x && x.classList.contains("barrier")) return false;
            } else {
              var _x = document.querySelector("[data-row=\"".concat(p1r, "\"][data-column=\"").concat(p1c + _i, "\"]"));

              if (_x && _x.classList.contains("barrier")) return false;
            }
          }

          return true;
        }

        if (xDistance === 1 && yDistance <= 4 || yDistance === 1 && xDistance <= 4) return true;
      }
    };

    if (_this.gridSquares[randomSquare].classList.contains("occupied")) return _this.placeItem(cls, item);

    if (cls === "player") {
      if (getPlayerDistance(+row, +column)) return _this.placeItem(cls, item);
      _this.players[item.id - 1].location = {
        column: column,
        row: row
      };
      _this.gridSquares[randomSquare].innerHTML = item.image;
    } else if (cls === "barrier") {
      if (getObstacleDistance(+row, +column)) return _this.placeItem(cls, item);
      _this.gridSquares[randomSquare].innerHTML = item;
    } else {
      _this.gridSquares[randomSquare].innerHTML = item;
    }

    _this.gridSquares[randomSquare].classList.add(cls);

    _this.gridSquares[randomSquare].classList.add("occupied");
  });

  _defineProperty(this, "highlightMoves", function () {
    var _this$currentPlayer$l = _this.currentPlayer.location,
        row = _this$currentPlayer$l.row,
        column = _this$currentPlayer$l.column;

    var element = function element(direction, num) {
      switch (direction) {
        case "north":
          return document.querySelector("[data-row=\"".concat(row - num, "\"][data-column=\"").concat(column, "\"]"));

        case "south":
          return document.querySelector("[data-row=\"".concat(Number(row) + num, "\"][data-column=\"").concat(column, "\"]"));

        case "west":
          return document.querySelector("[data-row=\"".concat(row, "\"][data-column=\"").concat(Number(column) - num, "\"]"));

        case "east":
          return document.querySelector("[data-row=\"".concat(row, "\"][data-column=\"").concat(Number(column) + num, "\"]"));

        default:
          break;
      }
    }; // Checking which moves are available for the players to make


    var availability = function availability(direction) {
      var move1 = element(direction, 1);
      var move2 = element(direction, 2);
      var move3 = element(direction, 3);
      if (!move1) return;
      if (move1.classList.contains("barrier") || move1.classList.contains("player")) return;
      move1.classList.add("highlight");
      move1.addEventListener("click", _this.movePlayer);
      if (!move2) return;
      if (move2.classList.contains("barrier") || move2.classList.contains("player")) return;
      move2.classList.add("highlight");
      move2.addEventListener("click", _this.movePlayer);
      if (!move3) return;
      if (move3.classList.contains("barrier") || move3.classList.contains("player")) return;
      move3.classList.add("highlight");
      move3.addEventListener("click", _this.movePlayer);
    };

    availability("north");
    availability("south");
    availability("west");
    availability("east");
  });

  _defineProperty(this, "movePlayer", function (e) {
    var oldPosition = document.querySelector("[data-row=\"".concat(_this.currentPlayer.location.row, "\"][data-column=\"").concat(_this.currentPlayer.location.column, "\"]"));
    var newPosition = e.target.nodeName === "IMG" ? e.path[1] : e.target;
    var player = _this.players[_this.currentPlayer.id - 1]; //remove image from old location

    if (_this.currentPlayer.weapon.oldWeapon) {
      oldPosition.innerHTML = _this.currentPlayer.weapon.oldWeapon;
      oldPosition.classList.add("weapon");
      player.weapon.oldWeapon = null;
    } else {
      oldPosition.innerHTML = "";
    }

    oldPosition.classList.remove("player"); //add image to new location

    var _newPosition$dataset = newPosition.dataset,
        row = _newPosition$dataset.row,
        column = _newPosition$dataset.column;

    if (e.target.nodeName === "IMG") {
      newPosition.innerHTML = _this.currentPlayer.image;
      newPosition.classList.add("player");
      var image = e.target.outerHTML;
      var damage = e.target.dataset.damage;
      document.querySelector("#weapon".concat(_this.currentPlayer.id)).innerHTML = image;
      document.querySelector("#damage".concat(_this.currentPlayer.id)).innerHTML = damage; //change player location

      player.location = {
        row: row,
        column: column
      };
      player.weapon = {
        image: image,
        damage: damage,
        oldWeapon: _this.currentPlayer.weapon.image
      };
    } else {
      newPosition.innerHTML = _this.currentPlayer.image;
      newPosition.classList.add("player"); //change player location

      player.location = {
        row: row,
        column: column
      };
    }

    _this.players[_this.currentPlayer.id - 1] = player;

    if (_this.detectRetaliation(column, row)) {
      _this.retaliation();
    } else {
      _this.changeTurn();
    } //REMOVE HIGHLIGHTS OF MOVES AND CLICK EVENTLISTENER FROM PREVIOUS AVAILABLE MOVES


    var _iterator2 = _createForOfIteratorHelper(document.querySelectorAll(".highlight")),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var elm = _step2.value;
        elm.classList.remove("highlight");
        elm.removeEventListener("click", _this.movePlayer);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  });

  _defineProperty(this, "detectRetaliation", function (column, row) {
    var north = document.querySelector("[data-row=\"".concat(row - 1, "\"][data-column=\"").concat(column, "\"]"));
    var south = document.querySelector("[data-row=\"".concat(Number(row) + 1, "\"][data-column=\"").concat(column, "\"]"));
    var east = document.querySelector("[data-row=\"".concat(row, "\"][data-column=\"").concat(Number(column) + 1, "\"]"));
    var west = document.querySelector("[data-row=\"".concat(row, "\"][data-column=\"").concat(column - 1, "\"]"));
    if (north && north.classList.contains("player")) return true;
    if (south && south.classList.contains("player")) return true;
    if (east && east.classList.contains("player")) return true;
    if (west && west.classList.contains("player")) return true;
  });

  _defineProperty(this, "retaliation", function () {
    var attacker = _this.currentPlayer;
    _this.currentPlayer = attacker.id === 1 ? _this.players[1] : _this.players[0];
    var opponent = _this.currentPlayer; // UPDATE PLAYER PANELS HIGHLIGHT 

    document.querySelector("#player".concat(attacker.id)).classList.remove("current");
    document.querySelector("#player".concat(opponent.id)).classList.add("current");
    var retaliationModal = document.querySelector("#retaliationModal");
    setTimeout(function () {
      retaliationModal.classList.add("open");
    }, 500);
    document.querySelector("#retaliationModal .avatar").innerHTML = opponent.image; // DEFEND?

    var defend = function defend() {
      document.querySelector("#attack").removeEventListener("click", attack);
      document.querySelector("#run").removeEventListener("click", run);
      var health = opponent.lifePoints - attacker.weapon.damage / 2;
      _this.players[opponent.id - 1].lifePoints = health;
      document.querySelector("#health".concat(opponent.id)).innerHTML = health;
      var shieldStatus = document.querySelector("#shield".concat(opponent.id));
      shieldStatus.innerHTML = "Protected";
      shieldStatus.classList.add("protected");
      document.querySelector("#health".concat(opponent.id)).innerHTML = health;
      retaliationModal.classList.remove("open"); // REMOVE HIGHLIGHTS

      var _iterator3 = _createForOfIteratorHelper(document.querySelectorAll(".highlight")),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var tile = _step3.value;
          tile.classList.remove("highlight");
          tile.removeEventListener("click", _this.movePlayer);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      if (_this.gameOver(opponent, attacker)) return;

      _this.retaliation();
    }; // DEFEND AND RUN?


    var run = function run() {
      document.querySelector("#attack").removeEventListener("click", attack);
      document.querySelector("#defend").removeEventListener("click", defend);
      var health = opponent.lifePoints - attacker.weapon.damage / 2;
      _this.players[opponent.id - 1].lifePoints = health;
      document.querySelector("#health".concat(opponent.id)).innerHTML = health;
      var shieldStatus = document.querySelector("#shield".concat(opponent.id));
      shieldStatus.innerHTML = "Protected";
      shieldStatus.classList.add("protected");
      document.querySelector("#health".concat(opponent.id)).innerHTML = health; // CLOSE THE RETALIATION MODAL 

      retaliationModal.classList.remove("open"); // REMOVE HIGHLIGHTS

      var _iterator4 = _createForOfIteratorHelper(document.querySelectorAll(".highlight")),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var tile = _step4.value;
          tile.classList.remove("highlight");
          tile.removeEventListener("click", _this.movePlayer);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      if (_this.gameOver(opponent, attacker)) return;

      _this.highlightMoves();
    }; // ATTACK?


    var attack = function attack() {
      // Remove eventlisteners to defend or run
      document.querySelector("#defend").removeEventListener("click", defend);
      document.querySelector("#run").removeEventListener("click", run);
      var health = opponent.lifePoints - attacker.weapon.damage;
      retaliationModal.classList.remove("open");
      _this.players[opponent.id - 1].lifePoints = health;
      document.querySelector("#health".concat(opponent.id)).innerHTML = health;
      var shieldStatus = document.querySelector("#shield".concat(opponent.id));
      shieldStatus.innerHTML = "Unprotected";
      shieldStatus.classList.remove("protected"); // REMOVE HIGHLIGHTS

      var _iterator5 = _createForOfIteratorHelper(document.querySelectorAll(".highlight")),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var tile = _step5.value;
          tile.classList.remove("highlight");
          tile.removeEventListener("click", _this.movePlayer);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      if (_this.gameOver(opponent, attacker)) return;

      _this.retaliation();
    };

    document.querySelector("#attack").addEventListener("click", attack, {
      once: true
    });
    document.querySelector("#defend").addEventListener("click", defend, {
      once: true
    });
    document.querySelector("#run").addEventListener("click", run, {
      once: true
    });
  });

  _defineProperty(this, "gameOver", function (opponent, attacker) {
    if (opponent.lifePoints <= 0) {
      // IF HEALTH EQUAL TO 0 OR BELOW THEN RETALIATION MODAL CLOSES AND OPENS THE GAMEOVER MODAL 
      document.querySelector("#retaliationModal").classList.remove("open");
      document.querySelector("#gameOverModal").classList.add("open"); // DECLARING THE WINNER.

      document.querySelector("#gameOverModal p:first-of-type").innerHTML = "".concat(attacker.name, ", you are the winner \uD83C\uDF8A");
      document.querySelector("#gameOverModal p:last-of-type").innerHTML = "".concat(opponent.name, ", you are the loser \uD83D\uDC4E");
      return true;
    }
  });

  _defineProperty(this, "detectTurn", function () {
    document.querySelector("#player".concat(_this.currentPlayer.id)).classList.add("current");
    setTimeout(_this.highlightMoves, 500);
  });

  _defineProperty(this, "changeTurn", function () {
    var _iterator6 = _createForOfIteratorHelper(document.querySelectorAll(".sidebar")),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var elm = _step6.value;
        elm.classList.remove("current");
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }

    if (_this.currentPlayer.id === 1) {
      _this.currentPlayer = _this.players[1];
    } else {
      _this.currentPlayer = _this.players[0];
    }

    _this.detectTurn();
  });

  this.players = players;
  this.gridSquares = document.querySelectorAll(".grid-item");
  this.currentPlayer = null;
} // CREATING THE MAP 
;

_defineProperty(Game, "generateMap", function () {
  var map = document.querySelector("#game-board");
  var col = 0;
  var row = 1;
  map.innerHTML = "";

  for (var column = 0; column < 81; column++) {
    col++;
    map.innerHTML += "<div class='grid-item' data-row=".concat(row, " data-column=").concat(col, "></div>");

    if (col === 9) {
      col = 0;
      row++;
    }
  }
});

var _default = Game;
exports.default = _default;
},{"./assets":"js/assets.js"}],"js/app.js":[function(require,module,exports) {
"use strict";

var _player = _interopRequireDefault(require("./player"));

var _game = _interopRequireDefault(require("./game"));

var _assets = require("./assets");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var weapons = [_assets.weapon0, _assets.weapon1, _assets.weapon2, _assets.weapon3];

_game.default.generateMap();

var newGame = function newGame() {
  $("#gameOverModal").removeClass("open");
  var player1 = new _player.default("Ironman", _assets.ironman, _assets.weapon1).generate();
  var player2 = new _player.default("Cap America", _assets.capShield, _assets.weapon0, player1.id).generate();

  _game.default.generateMap();

  var game = new _game.default([player1, player2]); //Start new game

  game.newGame();
  var wDetails = [{
    name: "Space",
    damage: 10
  }, {
    name: "Power",
    damage: 10
  }, {
    name: "Soul",
    damage: 20
  }, {
    name: "Gauntlet",
    damage: 30
  }];
  $("#legend").html("<div></div>");

  for (var i = 0; i < weapons.length; i++) {
    $("#legend > div").append("\n    <div>\n    <span>".concat(wDetails[i].name, "</span>\n      <img src=").concat(weapons[i], " alt=\"\" />\n      <span>").concat(wDetails[i].damage, "</span>\n    </div>"));
  }
};

$("#newGame").on("click", newGame);
$("#newGame2").on("click", newGame);
$("#rules").on("click", function () {
  $("#rulesModal").addClass("open");
});
$("#closeRules").on("click", function () {
  $("#rulesModal").removeClass("open");
});
},{"./player":"js/player.js","./game":"js/game.js","./assets":"js/assets.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "1612" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map