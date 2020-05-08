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
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/assets/Enemies-bg.png":[function(require,module,exports) {
module.exports = "/Enemies-bg.b61f615e.png";
},{}],"src/assets/Enemies.png":[function(require,module,exports) {
module.exports = "/Enemies.24f39282.png";
},{}],"src/assets/Player-bg.png":[function(require,module,exports) {
module.exports = "/Player-bg.6d2d5742.png";
},{}],"src/assets/Player.png":[function(require,module,exports) {
module.exports = "/Player.bc12fa0d.png";
},{}],"src/assets/Tiles-bg.png":[function(require,module,exports) {
module.exports = "/Tiles-bg.c2945f46.png";
},{}],"src/assets/Tiles.png":[function(require,module,exports) {
module.exports = "/Tiles.53a04ea3.png";
},{}],"src/assets/bg.png":[function(require,module,exports) {
module.exports = "/bg.370e7052.png";
},{}],"src/Assets.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EnemiesBg = _interopRequireDefault(require("./assets/Enemies-bg.png"));

var _Enemies = _interopRequireDefault(require("./assets/Enemies.png"));

var _PlayerBg = _interopRequireDefault(require("./assets/Player-bg.png"));

var _Player = _interopRequireDefault(require("./assets/Player.png"));

var _TilesBg = _interopRequireDefault(require("./assets/Tiles-bg.png"));

var _Tiles = _interopRequireDefault(require("./assets/Tiles.png"));

var _bg = _interopRequireDefault(require("./assets/bg.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Assets = {
  imgsSrcs: [_EnemiesBg.default, _Enemies.default, _PlayerBg.default, _Player.default, _TilesBg.default, _Tiles.default, _bg.default],
  imgs: {},
  carregarAssets: function carregarAssets(callback) {
    var numeroImagens = this.imgsSrcs.length;
    var imagensCarregadas = 0;

    var onload = function onload(e) {
      imagensCarregadas++;
      if (imagensCarregadas === numeroImagens - 1) callback();
    };

    for (var i = numeroImagens - 1, j = 0; i >= 0; i--, j++) {
      var nomeImagem = this.imgsSrcs[j].replace(/\.(.*)/, '').replace('/', '');
      this.imgs[nomeImagem] = new Image();
      this.imgs[nomeImagem].src = this.imgsSrcs[j];
      this.imgs[nomeImagem].onload = onload;
    }
  }
};
var _default = Assets;
exports.default = _default;
},{"./assets/Enemies-bg.png":"src/assets/Enemies-bg.png","./assets/Enemies.png":"src/assets/Enemies.png","./assets/Player-bg.png":"src/assets/Player-bg.png","./assets/Player.png":"src/assets/Player.png","./assets/Tiles-bg.png":"src/assets/Tiles-bg.png","./assets/Tiles.png":"src/assets/Tiles.png","./assets/bg.png":"src/assets/bg.png"}],"src/Tile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Assets = _interopRequireDefault(require("./Assets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = function Tile() {
  _classCallCheck(this, Tile);

  this.image = _Assets.default.imgs['Tiles'];
  this.x = 0;
  this.y = 0;
  this.sx = 0;
  this.sy = 152;
  this.sw = 8;
  this.sh = 8;
};

var _default = Tile;
exports.default = _default;
},{"./Assets":"src/Assets.js"}],"src/Renderer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Assets = _interopRequireDefault(require("./Assets"));

var _Tile = _interopRequireDefault(require("./Tile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Renderer = /*#__PURE__*/function () {
  function Renderer(ctx) {
    var Game = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Renderer);

    this.ctx = ctx;
    this.Game = Game;
    this.larguraTileAtual;
    this.alturaTileAtual;
    this.tileGrama = new _Tile.default();
    this.currentLevel = Game.levels[Game.currentLevelIndex];
    var auxCanvas = document.createElement('canvas');
    auxCanvas.width = window.innerWidth;
    auxCanvas.height = window.innerHeight;
    auxCanvas.style.zIndex = -1;
    auxCanvas.style.position = 'absolute';
    this.auxCtx = auxCanvas.getContext('2d');
    this.auxCtx.imageSmoothingEnabled = false;
    document.body.appendChild(auxCanvas);
    this.auxCanvas = auxCanvas;
    this.x = 0;
  }

  _createClass(Renderer, [{
    key: "draw",
    value: function draw(level) {
      this.ctx.globalAlpha = 1;
      this.drawBG(level);
      this.drawObjects(level);
      this.drawPlayer(level);
    }
  }, {
    key: "drawObjects",
    value: function drawObjects() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var mapa = level.mapa;
      var camera = level.camera;
      var larguraTile = camera.tileSize;
      var alturaTile = camera.tileSize; // var larguraTile = parseInt(Math.ceil(window.innerWidth / mapa.larguraMapa));
      // var alturaTile = parseInt(Math.ceil(window.innerHeight / mapa.alturaMapa));

      this.larguraTileAtual = larguraTile;
      this.alturaTileAtual = alturaTile;

      for (var i = 0; i < mapa.alturaMapa; i++) {
        for (var j = 0; j < mapa.larguraMapa; j++) {
          try {
            if (mapa.map[i][j] != 0) {
              this.auxCtx.drawImage(_Assets.default.imgs['Tiles'], 0, 152, 8, 8, larguraTile * j + camera.x, alturaTile * i + camera.y, larguraTile, alturaTile);
            }
          } catch (e) {
            console.error(e);
            console.log(i, j);
            console.log(mapa.map[i][j]);
            console.log(mapa);
          }
        }
      }

      this.ctx.drawImage(this.auxCanvas, this.x, 0);
    }
  }, {
    key: "drawBG",
    value: function drawBG(level) {
      var mapa = level.mapa;
      var larguraTile = parseInt(Math.ceil(window.innerWidth / mapa.larguraMapa));
      var alturaTile = parseInt(Math.ceil(window.innerHeight / mapa.alturaMapa));
      this.larguraTileAtual = larguraTile;
      this.alturaTileAtual = alturaTile;

      for (var i = 0; i < mapa.alturaMapa; i++) {
        for (var j = 0; j < mapa.larguraMapa; j++) {
          this.auxCtx.drawImage(_Assets.default.imgs['bg'], larguraTile * j, alturaTile * i, larguraTile, alturaTile);
        }
      }

      this.ctx.drawImage(this.auxCanvas, this.x, 0);
    }
  }, {
    key: "drawPlayer",
    value: function drawPlayer() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var player = level.player;
      var camera = level.camera;

      if (player.facingLeft) {
        this.ctx.save();
        this.ctx.translate(player.xTela, player.yTela);
        this.ctx.scale(-1, 1);
        this.ctx.drawImage(_Assets.default.imgs['Player'], player.sx, player.sy, player.sw, player.sh, 0 - camera.tileSize, 0, this.larguraTileAtual, this.alturaTileAtual);
        this.ctx.restore();
      } else {
        this.ctx.drawImage(_Assets.default.imgs['Player'], player.sx, player.sy, player.sw, player.sh, player.xTela, player.yTela, this.larguraTileAtual, this.alturaTileAtual);
      }

      this.drawBullets(player.bullets);
    }
  }, {
    key: "drawBullets",
    value: function drawBullets(bullets) {
      var _this = this;

      this.ctx.fillStyle = 0xFF0000;
      bullets.forEach(function (b) {
        _this.ctx.fillRect(b.x, b.y, 10, 10);
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      this.ctx.fillStyle = this.Game.CONSTANTES.CLEAR_COLOR;
      this.ctx.fillRect(0, 0, this.Game.CONSTANTES.LARGURA, this.Game.CONSTANTES.ALTURA);
    }
  }]);

  return Renderer;
}();

function getImage(numero) {
  switch (parseInt(numero)) {
    case 0:
      return _Assets.default.imgs['bg'];

    case 1:
      return _Assets.default.imgs['Tiles'];
  }
}

var _default = Renderer;
exports.default = _default;
},{"./Assets":"src/Assets.js","./Tile":"src/Tile.js"}],"src/Input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Game = _interopRequireDefault(require("./Game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = {
  iniciarInput: function iniciarInput() {
    window.onkeydown = function (e) {
      this.tratarInput(e);
    }.bind(this);

    window.onkeyup = function (e) {
      this.tratarInput(e);
    }.bind(this);
  },
  tratarInput: function tratarInput(e) {
    switch (_Game.default.estadoGameAtual) {
      case _Game.default.Estados.PAUSADO:
        switch (e.type) {
          case 'keydown':
            this.keyDownPausado(e.key);
            break;

          case 'keyup':
            this.keyUpPausado(e.key);
            break;
        }

        break;

      case _Game.default.Estados.RUNNING:
        switch (e.type) {
          case 'keydown':
            this.keyDownRunning(e.key);
            break;

          case 'keyup':
            this.keyUpRunning(e.key);
            break;
        }

        break;
    }
  },
  keyUpPausado: function keyUpPausado(key) {},
  keyDownPausado: function keyDownPausado(key) {
    switch (key) {
      case 'Escape':
        _Game.default.estadoGameAtual = _Game.default.Estados.RUNNING;
        break;
    }
  },
  keyUpRunning: function keyUpRunning(key) {
    switch (key) {
      case 'a':
        this.estado.andandoEsquerda = false;
        this.estado.parado = true;
        break;

      case 'd':
        this.estado.andandoDireita = false;
        this.estado.parado = true;
        break;

      case 'Control':
        this.estado.atirando = false;
        break;

      case 'Shift':
        this.estado.correndo = false;
        break;
    }
  },
  keyDownRunning: function keyDownRunning(key) {
    switch (key) {
      case 'a':
        this.estado.andandoEsquerda = true;
        this.estado.andandoDireita = false;
        this.estado.parado = false;
        break;

      case 'd':
        this.estado.andandoEsquerda = false;
        this.estado.andandoDireita = true;
        this.estado.parado = false;
        break;

      case 'w':
        if (!this.estado.pulando) this.estado.pulando = true;
        break;

      case 'Control':
        this.estado.atirando = true;
        break;

      case 'Shift':
        this.estado.correndo = true;
        break;

      case 'Escape':
        _Game.default.estadoGameAtual = _Game.default.Estados.PAUSADO;
        break;
    }
  },
  estado: {
    andandoDireita: false,
    andandoEsquerda: false,
    parado: true,
    pulando: false,
    correndo: false
  }
};
var _default = Input;
exports.default = _default;
},{"./Game":"src/Game.js"}],"src/map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Map = /*#__PURE__*/function () {
  function Map(mapSource) {
    _classCallCheck(this, Map);

    this.mapSource = mapSource;
    this.map = [];
    this.larguraMapa = 0;
    this.alturaMapa = 0;
    this.montarMapa();
  }

  _createClass(Map, [{
    key: "montarMapa",
    value: function montarMapa() {
      var _INICIO = "#INICIO#\n";
      var _FIM = "#FIM#";
      var inicio = this.mapSource.indexOf(_INICIO) + _INICIO.length - 1;
      var fim = this.mapSource.indexOf(_FIM);
      this.larguraMapa = this.mapSource.indexOf('\n', inicio) + 1;
      this.alturaMapa = this.mapSource.substring(inicio, fim - 1).match(/\n/g, '').length;
      var linha = [];

      for (var i = inicio + 1; i < fim; i++) {
        if (isNumber(this.mapSource[i])) {
          linha.push(this.mapSource[i]);
        } else {
          this.map.push(linha);
          linha = [];
        }
      }
    }
  }]);

  return Map;
}();

exports.default = Map;

function isNumber(char) {
  if (char === '0') return true;else if (char === '1') return true;else if (char === '2') return true;else if (char === '3') return true;else if (char === '4') return true;else if (char === '5') return true;else if (char === '6') return true;else if (char === '7') return true;else if (char === '8') return true;else if (char === '9') return true;
}
},{}],"src/Camera.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Camera = /*#__PURE__*/function () {
  function Camera() {
    var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var tileSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 150;

    _classCallCheck(this, Camera);

    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    var _ESPACAMENTO = 300;
    this._X2_THRESHOLD = window.innerWidth - _ESPACAMENTO;
    this._X1_THRESHOLD = _ESPACAMENTO;
  }

  _createClass(Camera, [{
    key: "mover",
    value: function mover(player) {
      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      if (player.x >= this._X2_THRESHOLD || player.x < this._X1_THRESHOLD) this.x = this.x - player.vx;
    }
  }]);

  return Camera;
}();

var _default = Camera;
exports.default = _default;
},{}],"src/maps/map1.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n#INICIO#\n0001000100\n0000000000\n0100010010\n1111110111\n0000000000\n0000000000\n1110011111\n0000000000\n1111111111\n0000000000\n#FIM#\n";
exports.default = _default;
},{}],"src/maps/map2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n#INICIO#\n0000000000\n0000000000\n0000000000\n0000000000\n0000000000\n0000000000\n1110011111\n0000000000\n1111111111\n0000000000\n#FIM#\n";
exports.default = _default;
},{}],"src/maps/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _map = _interopRequireDefault(require("./map1"));

var _map2 = _interopRequireDefault(require("./map2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [_map.default, _map2.default];
exports.default = _default;
},{"./map1":"src/maps/map1.js","./map2":"src/maps/map2.js"}],"src/Char.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Assets = _interopRequireDefault(require("./Assets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Char = {
  _VELOCIDADE_X: 5,
  _VELOCIDADE_ADICIONAL_X: 3,
  _VELOCIDADE_Y: 5,
  _VELOCIDADE_PULO: -15,
  _MAX_BULLETS: 3,
  _BULLET_SPEED: 10,
  image: _Assets.default.imgs['Player'],
  facingLeft: false,
  currentAnimationCicle: 'IDLE',
  currentAnimationFrame: 0,
  lastAnimationUpdate: 0,
  maxFrameTime: 100,
  bullets: [],
  animationFrames: {
    IDLE: [{
      x: 1,
      y: 57
    }, {
      x: 9,
      y: 57
    }, {
      x: 17,
      y: 57
    }, {
      x: 25,
      y: 57
    }],
    WALKING: [{
      x: 1,
      y: 32
    }, {
      x: 9,
      y: 32
    }, {
      x: 17,
      y: 32
    }, {
      x: 25,
      y: 32
    }, {
      x: 32,
      y: 32
    }, {
      x: 40,
      y: 32
    }],
    RUNNING: [{
      x: 0,
      y: 151
    }],
    JUMP: [{
      x: 0,
      y: 151
    }],
    HIT: [{
      x: 0,
      y: 151
    }]
  },
  x: 400,
  y: 0,
  xTela: 400,
  yTela: 0,
  vx: 0,
  vy: 5,
  sx: 1,
  sy: 9,
  sw: 7,
  sh: 7,
  update: function update(input) {
    if (input.estado.andandoDireita) {
      this.vx = +this._VELOCIDADE_X + (input.estado.correndo ? this._VELOCIDADE_ADICIONAL_X : 0);
      this.facingLeft = false;
      this.currentAnimationCicle = 'WALKING';
    } else if (input.estado.andandoEsquerda) {
      DOMError;
      this.vx = -(this._VELOCIDADE_X + (input.estado.correndo ? this._VELOCIDADE_ADICIONAL_X : 0));
      this.facingLeft = true;
      this.currentAnimationCicle = 'WALKING';
    } else {
      this.vx = 0;
      this.currentAnimationCicle = 'IDLE';
    }

    if (input.estado.pulando) {
      this.vy = this._VELOCIDADE_PULO;
      input.estado.pulando = false;
    }

    if (input.estado.atirando) {
      input.estado.atirando = false;
      this.atirar();
    }

    this.animate(input);
    this.updateBullets();
  },
  animate: function animate(input) {
    var now = Date.now();

    if (now - this.lastAnimationUpdate > this.maxFrameTime) {
      this.lastAnimationUpdate = now;
      var maxFrames = this.animationFrames[this.currentAnimationCicle].length - 1;

      if (this.currentAnimationFrame < maxFrames) {
        this.currentAnimationFrame++;
        this.sx = this.animationFrames[this.currentAnimationCicle][this.currentAnimationFrame].x;
        this.sy = this.animationFrames[this.currentAnimationCicle][this.currentAnimationFrame].y;
      } else this.currentAnimationFrame = 0;
    }
  },
  move: function move(input) {
    console.log(this.x);
    this.x += this.vx;
    this.xTela += this.vx;

    if (this.xTela >= window.innerWidth - 300) {
      this.xTela = window.innerWidth - 300;
    } else if (this.xTela <= 300) {
      this.xTela = 300;
    }
  },
  cair: function cair() {
    if (this.vy < this._VELOCIDADE_Y) this.vy += .8;
    this.y += this.vy;
    this.yTela += this.vy;
  },
  atirar: function atirar() {
    if (this.bullets.length < this._MAX_BULLETS) {
      this.bullets.push({
        x: this.x,
        y: this.y,
        vx: this._BULLET_SPEED
      });
    }
  },
  updateBullets: function updateBullets() {
    this.bullets = this.bullets.map(function (b) {
      b.x += b.vx;

      if (b.x >= 0 && b.x <= window.innerWidth) {
        return b;
      }
    });
  },
  checkCollisionX: function checkCollisionX(mapa, larguraTileAtual, alturaTileAtual) {
    var xAtual = Math.floor(parseInt(this.x / larguraTileAtual));
    var yAtual = Math.floor(parseInt(this.y / alturaTileAtual));
    var map = mapa.map;
    var xDirecao;
    if (this.vx > 0) xDirecao = Math.floor(parseInt((this.x + larguraTileAtual / 2) / larguraTileAtual));else if (this.vx < 0) {
      xDirecao = Math.floor(parseInt((this.x - larguraTileAtual / 2) / larguraTileAtual));
    }

    try {
      if (map[yAtual][xDirecao] == 1 || map[yAtual][xDirecao] === undefined) {
        return true;
      } else return false;
    } catch (e) {}
  },
  checkCollisionY: function checkCollisionY(mapa, larguraTileAtual, alturaTileAtual) {
    var xAtual = Math.floor(parseInt(this.x / larguraTileAtual));
    var yAtual = Math.floor(parseInt(this.y / alturaTileAtual));
    var map = mapa.map;
    var yDirecao;
    if (this.vy > 0) yDirecao = Math.floor(parseInt((this.y + alturaTileAtual) / alturaTileAtual));else if (this.vy < 0) yDirecao = Math.floor(parseInt(this.y / alturaTileAtual));

    try {
      if (map[yDirecao][xAtual] == 1 || map[yDirecao][xAtual] === undefined) {
        if (this.vy < 0) {
          this.vy = 0; // this.y += 1;
        } else {
          return true;
        }
      }

      return false;
    } catch (e) {}
  }
};
var _default = Char;
exports.default = _default;
},{"./Assets":"src/Assets.js"}],"src/Level.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _map = _interopRequireDefault(require("./map"));

var _Camera = _interopRequireDefault(require("./Camera"));

var _maps = _interopRequireDefault(require("./maps"));

var _Char = _interopRequireDefault(require("./Char"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Level = function Level() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  _classCallCheck(this, Level);

  this.player = _Char.default;
  this.objetos = [];
  this.camera = new _Camera.default(_maps.default[index]);
  this.mapa = new _map.default(_maps.default[index]);
};

var _default = Level;
exports.default = _default;
},{"./map":"src/map.js","./Camera":"src/Camera.js","./maps":"src/maps/index.js","./Char":"src/Char.js"}],"src/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Renderer = _interopRequireDefault(require("./Renderer"));

var _Input = _interopRequireDefault(require("./Input"));

var _Level = _interopRequireDefault(require("./Level"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Game = {
  CONSTANTES: {
    LARGURA: window.innerWidth,
    ALTURA: window.innerHeight,
    CLEAR_COLOR: 0x000000,
    TILE_SIZE: 40
  },
  Estados: {
    INTRO: 0,
    MENU: 1,
    ANIMACAO: 2,
    PAUSADO: 3,
    RUNNING: 4
  },
  currentAlpha: 1.0,
  estadoGameAtual: 4,
  levels: [],
  currentLevelIndex: 0,
  iniciarTudo: function iniciarTudo() {
    this.iniciarLevels();
    this.iniciarCanvas();
    this.renderer = new _Renderer.default(this.ctx, this);
    this.input = _Input.default;
    this.input.iniciarInput();
  },
  iniciarLevels: function iniciarLevels() {
    this.levels.push(new _Level.default(0));
  },
  iniciarCanvas: function iniciarCanvas() {
    var canvas = document.createElement('canvas');
    canvas.width = this.CONSTANTES.LARGURA;
    canvas.height = this.CONSTANTES.ALTURA;
    document.body.appendChild(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
  },
  update: function update() {
    var levelAtual = this.levels[this.currentLevelIndex]; // Movendo camera

    if (levelAtual.player.vx != 0) {
      levelAtual.camera.mover(levelAtual.player);
    }

    levelAtual.player.update(this.input);

    if (!levelAtual.player.checkCollisionX(levelAtual.mapa, this.renderer.larguraTileAtual, this.renderer.alturaTileAtual)) {
      levelAtual.player.move(this.input);
    }

    if (!levelAtual.player.checkCollisionY(levelAtual.mapa, this.renderer.larguraTileAtual, this.renderer.alturaTileAtual)) {
      levelAtual.player.cair();
    }
  },
  loop: function loop() {
    switch (this.estadoGameAtual) {
      case Game.Estados.PAUSADO:
        this.pausedLoop();
        break;

      case Game.Estados.RUNNING:
        this.mainLoop();
        break;
    }

    requestAnimationFrame(function () {
      this.loop();
    }.bind(this));
  },
  pausedLoop: function pausedLoop() {
    if (this.currentAlpha > .5) {
      this.currentAlpha -= .01;
      this.ctx.globalAlpha = this.currentAlpha;
    }

    this.ctx.fillStyle = "#6F8B6E";
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  },
  mainLoop: function mainLoop() {
    this.update();
    this.renderer.clear();
    this.renderer.draw(this.levels[this.currentLevelIndex]);
  }
};
var _default = Game;
exports.default = _default;
},{"./Renderer":"src/Renderer.js","./Input":"src/Input.js","./Level":"src/Level.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

var _Assets = _interopRequireDefault(require("./Assets"));

var _Game = _interopRequireDefault(require("./Game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Assets.default.carregarAssets(function () {
  _Game.default.iniciarTudo();

  _Game.default.loop();
});
},{"./styles.css":"src/styles.css","./Assets":"src/Assets.js","./Game":"src/Game.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54559" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map