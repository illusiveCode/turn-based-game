parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"eDsD":[function(require,module,exports) {
"use strict";function e(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}function a(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=function t(n,i,o){var r=this,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;e(this,t),a(this,"generate",function(){return{id:r.id,name:r.name,image:'<img src="'.concat(r.image,'" alt="').concat(r.name,'" />'),weapon:{image:'<img src="'.concat(r.weapon,'" alt="" data-damage="10" />'),damage:50,oldWeapon:""},lifePoints:100,location:{row:0,column:0},shield:!1}}),this.id=c+1,this.name=n,this.image=i,this.weapon=o},n=t;exports.default=n;
},{}],"CwJ0":[function(require,module,exports) {
module.exports="cap-shield.42edab47.png";
},{}],"Dwxw":[function(require,module,exports) {
module.exports="ironman.953131ef.png";
},{}],"WnLR":[function(require,module,exports) {
module.exports="space-stone.7ac75bdd.png";
},{}],"bQ8X":[function(require,module,exports) {
module.exports="power-stone.2a8b32ce.png";
},{}],"g6i9":[function(require,module,exports) {
module.exports="soul-stone.e3d033a4.png";
},{}],"PviM":[function(require,module,exports) {
module.exports="gauntlet.68a19454.png";
},{}],"S8Qr":[function(require,module,exports) {
module.exports="barrier.313ff7d7.png";
},{}],"RI4N":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"capShield",{enumerable:!0,get:function(){return e.default}}),Object.defineProperty(exports,"ironman",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(exports,"weapon0",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(exports,"weapon1",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(exports,"barrier",{enumerable:!0,get:function(){return i.default}}),exports.weapons=void 0;var e=o(require("../images/cap-shield.png")),r=o(require("../images/ironman.png")),t=o(require("../images/space-stone.png")),n=o(require("../images/power-stone.png")),u=o(require("../images/soul-stone.png")),a=o(require("../images/gauntlet.png")),i=o(require("../images/barrier.png"));function o(e){return e&&e.__esModule?e:{default:e}}var p=[u.default,a.default];exports.weapons=p;
},{"../images/cap-shield.png":"CwJ0","../images/ironman.png":"Dwxw","../images/space-stone.png":"WnLR","../images/power-stone.png":"bQ8X","../images/soul-stone.png":"g6i9","../images/gauntlet.png":"PviM","../images/barrier.png":"S8Qr"}],"IEHn":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("./assets");function t(e,t){var a;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(a=r(e))||t&&e&&"number"==typeof e.length){a&&(e=a);var n=0,c=function(){};return{s:c,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,l=!1;return{s:function(){a=e[Symbol.iterator]()},n:function(){var e=a.next();return i=e.done,e},e:function(e){l=!0,o=e},f:function(){try{i||null==a.return||a.return()}finally{if(l)throw o}}}}function r(e,t){if(e){if("string"==typeof e)return a(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(e,t):void 0}}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var o=function r(a){var o=this;n(this,r),c(this,"reset",function(){document.querySelector("#gameOverModal").classList.remove("open"),o.players.map(function(e){document.querySelector("#name".concat(e.id)).innerHTML=e.name,document.querySelector("#health".concat(e.id)).innerHTML=e.lifePoints,document.querySelector("#weapon".concat(e.id)).innerHTML=e.weapon.image,document.querySelector("#damage".concat(e.id)).innerHTML=e.weapon.damage,document.querySelector("#shield".concat(e.id)).innerHTML="Unprotected"})}),c(this,"newGame",function(){o.reset();for(var r=0;r<12;r++)o.placeItem("barrier","<img src=".concat(e.barrier,' alt="" />'));var a,n=10,c=t(e.weapons);try{for(c.s();!(a=c.n()).done;){var i=a.value;n+=10,o.placeItem("weapon","<img src=".concat(i,' alt="" data-damage="').concat(n,'" />'))}}catch(l){c.e(l)}finally{c.f()}o.players.map(function(e){o.placeItem("player",e)}),o.currentPlayer=o.players[Math.floor(Math.random()*o.players.length)],o.detectTurn()}),c(this,"placeItem",function(e,t){var r=Math.floor(Math.random()*o.gridSquares.length),a=o.gridSquares[r].dataset,n=a.column,c=a.row;if(o.gridSquares[r].classList.contains("occupied"))return o.placeItem(e,t);if("player"===e){if(function(e,t){if(o.players[0].location.row>0){var r=+o.players[0].location.column,a=+o.players[0].location.row,n=Math.abs(a-e),c=Math.abs(r-t);if(r===t&&n<=4){for(var i=1;i<=n;i++)if(a>e){var l=document.querySelector('[data-row="'.concat(a-i,'"][data-column="').concat(r,'"]'));if(l&&l.classList.contains("barrier"))return!1}else{var s=document.querySelector('[data-row="'.concat(a+i,'"][data-column="').concat(r,'"]'));if(s&&s.classList.contains("barrier"))return!1}return!0}if(a===e&&c<=4){for(var u=1;u<=c;u++)if(r>t){var d=document.querySelector('[data-row="'.concat(a,'"][data-column="').concat(r-u,'"]'));if(d&&d.classList.contains("barrier"))return!1}else{var m=document.querySelector('[data-row="'.concat(a,'"][data-column="').concat(r+u,'"]'));if(m&&m.classList.contains("barrier"))return!1}return!0}if(1===c&&n<=4||1===n&&c<=3)return!0}}(+c,+n))return o.placeItem(e,t);o.players[t.id-1].location={column:n,row:c},o.gridSquares[r].innerHTML=t.image}else if("barrier"===e){if(function(e,t){document.querySelector('[data-row="'.concat(e,'"][data-column="').concat(t,'"]'));var r=document.querySelector('[data-row="'.concat(e-1,'"][data-column="').concat(t,'"]')),a=document.querySelector('[data-row="'.concat(e-2,'"][data-column="').concat(t,'"]')),n=document.querySelector('[data-row="'.concat(e+1,'"][data-column="').concat(t,'"]')),c=document.querySelector('[data-row="'.concat(e+2,'"][data-column="').concat(t,'"]')),o=document.querySelector('[data-column="'.concat(t-1,'"][data-row="').concat(e,'"]')),i=document.querySelector('[data-column="'.concat(t-2,'"][data-row="').concat(e,'"]')),l=document.querySelector('[data-column="'.concat(t+1,'"][data-row="').concat(e,'"]')),s=document.querySelector('[data-column="'.concat(t+2,'"][data-row="').concat(e,'"]'));if(r&&r.classList.contains("barrier"))return!0;if(a&&a.classList.contains("barrier"))return!0;if(n&&n.classList.contains("barrier"))return!0;if(c&&c.classList.contains("barrier"))return!0;if(o&&o.classList.contains("barrier"))return!0;if(i&&i.classList.contains("barrier"))return!0;if(l&&l.classList.contains("barrier"))return!0;if(s&&s.classList.contains("barrier"))return!0;var u=document.querySelector('[data-row="'.concat(e+1,'"][data-column="').concat(t+1,'"]')),d=document.querySelector('[data-row="'.concat(e-1,'"][data-column="').concat(t-1,'"]')),m=document.querySelector('[data-row="'.concat(e-1,'"][data-column="').concat(t+1,'"]')),y=document.querySelector('[data-row="'.concat(e+1,'"][data-column="').concat(t-1,'"]'));return!(!u||!u.classList.contains("barrier"))||!(!d||!d.classList.contains("barrier"))||!(!m||!m.classList.contains("barrier"))||!(!y||!y.classList.contains("barrier"))||void 0}(+c,+n))return o.placeItem(e,t);o.gridSquares[r].innerHTML=t}else o.gridSquares[r].innerHTML=t;o.gridSquares[r].classList.add(e),o.gridSquares[r].classList.add("occupied")}),c(this,"highlightMoves",function(){var e=o.currentPlayer.location,t=e.row,r=e.column,a=function(e,a){switch(e){case"north":return document.querySelector('[data-row="'.concat(t-a,'"][data-column="').concat(r,'"]'));case"south":return document.querySelector('[data-row="'.concat(Number(t)+a,'"][data-column="').concat(r,'"]'));case"west":return document.querySelector('[data-row="'.concat(t,'"][data-column="').concat(Number(r)-a,'"]'));case"east":return document.querySelector('[data-row="'.concat(t,'"][data-column="').concat(Number(r)+a,'"]'))}},n=function(e){var t=a(e,1),r=a(e,2),n=a(e,3);t&&(t.classList.contains("barrier")||t.classList.contains("player")||(t.classList.add("highlight"),t.addEventListener("click",o.movePlayer),r&&(r.classList.contains("barrier")||r.classList.contains("player")||(r.classList.add("highlight"),r.addEventListener("click",o.movePlayer),n&&(n.classList.contains("barrier")||n.classList.contains("player")||(n.classList.add("highlight"),n.addEventListener("click",o.movePlayer)))))))};n("north"),n("south"),n("west"),n("east")}),c(this,"movePlayer",function(e){var r=document.querySelector('[data-row="'.concat(o.currentPlayer.location.row,'"][data-column="').concat(o.currentPlayer.location.column,'"]')),a="IMG"===e.target.nodeName?e.path[1]:e.target,n=o.players[o.currentPlayer.id-1];o.currentPlayer.weapon.oldWeapon?(r.innerHTML=o.currentPlayer.weapon.oldWeapon,r.classList.add("weapon"),n.weapon.oldWeapon=null):r.innerHTML="",r.classList.remove("player");var c=a.dataset,i=c.row,l=c.column;if("IMG"===e.target.nodeName){a.innerHTML=o.currentPlayer.image,a.classList.add("player");var s=e.target.outerHTML,u=e.target.dataset.damage;document.querySelector("#weapon".concat(o.currentPlayer.id)).innerHTML=s,document.querySelector("#damage".concat(o.currentPlayer.id)).innerHTML=u,n.location={row:i,column:l},n.weapon={image:s,damage:u,oldWeapon:o.currentPlayer.weapon.image}}else a.innerHTML=o.currentPlayer.image,a.classList.add("player"),n.location={row:i,column:l};o.players[o.currentPlayer.id-1]=n,o.detectRetaliation(l,i)?o.retaliation():o.changeTurn();var d,m=t(document.querySelectorAll(".highlight"));try{for(m.s();!(d=m.n()).done;){var y=d.value;y.classList.remove("highlight"),y.removeEventListener("click",o.movePlayer)}}catch(v){m.e(v)}finally{m.f()}}),c(this,"detectRetaliation",function(e,t){var r=document.querySelector('[data-row="'.concat(t-1,'"][data-column="').concat(e,'"]')),a=document.querySelector('[data-row="'.concat(Number(t)+1,'"][data-column="').concat(e,'"]')),n=document.querySelector('[data-row="'.concat(t,'"][data-column="').concat(Number(e)+1,'"]')),c=document.querySelector('[data-row="'.concat(t,'"][data-column="').concat(e-1,'"]'));return!(!r||!r.classList.contains("player"))||(!(!a||!a.classList.contains("player"))||(!(!n||!n.classList.contains("player"))||(!(!c||!c.classList.contains("player"))||void 0)))}),c(this,"retaliation",function(){var e=o.currentPlayer;o.currentPlayer=1===e.id?o.players[1]:o.players[0];var r=o.currentPlayer;document.querySelector("#player".concat(e.id)).classList.remove("current"),document.querySelector("#player".concat(r.id)).classList.add("current");var a=document.querySelector("#retaliationModal");setTimeout(function(){a.classList.add("open")},500),document.querySelector("#retaliationModal .avatar").innerHTML=r.image;var n=function(){document.querySelector("#attack").removeEventListener("click",i),document.querySelector("#run").removeEventListener("click",c);var n=r.lifePoints-e.weapon.damage/2;o.players[r.id-1].lifePoints=n,console.log("defend",r.id,n),document.querySelector("#health".concat(r.id)).innerHTML=n;var l=document.querySelector("#shield".concat(r.id));l.innerHTML="Protected",l.classList.add("protected"),document.querySelector("#health".concat(r.id)).innerHTML=n,a.classList.remove("open");var s,u=t(document.querySelectorAll(".highlight"));try{for(u.s();!(s=u.n()).done;){var d=s.value;d.classList.remove("highlight"),d.removeEventListener("click",o.movePlayer)}}catch(m){u.e(m)}finally{u.f()}o.gameOver(r,e)||o.retaliation()},c=function(){document.querySelector("#attack").removeEventListener("click",i),document.querySelector("#defend").removeEventListener("click",n);var c=r.lifePoints-e.weapon.damage/2;o.players[r.id-1].lifePoints=c,console.log("defend",r.id,c),document.querySelector("#health".concat(r.id)).innerHTML=c;var l=document.querySelector("#shield".concat(r.id));l.innerHTML="Protected",l.classList.add("protected"),document.querySelector("#health".concat(r.id)).innerHTML=c,a.classList.remove("open");var s,u=t(document.querySelectorAll(".highlight"));try{for(u.s();!(s=u.n()).done;){var d=s.value;d.classList.remove("highlight"),d.removeEventListener("click",o.movePlayer)}}catch(m){u.e(m)}finally{u.f()}o.gameOver(r,e)||o.highlightMoves()},i=function(){document.querySelector("#defend").removeEventListener("click",n),document.querySelector("#run").removeEventListener("click",c);var i=r.lifePoints-e.weapon.damage;console.log("attack",r.id,i),a.classList.remove("open"),o.players[r.id-1].lifePoints=i,document.querySelector("#health".concat(r.id)).innerHTML=i;var l=document.querySelector("#shield".concat(r.id));l.innerHTML="Unprotected",l.classList.remove("protected");var s,u=t(document.querySelectorAll(".highlight"));try{for(u.s();!(s=u.n()).done;){var d=s.value;d.classList.remove("highlight"),d.removeEventListener("click",o.movePlayer)}}catch(m){u.e(m)}finally{u.f()}o.gameOver(r,e)||o.retaliation()};document.querySelector("#attack").addEventListener("click",i,{once:!0}),document.querySelector("#defend").addEventListener("click",n,{once:!0}),document.querySelector("#run").addEventListener("click",c,{once:!0})}),c(this,"gameOver",function(e,t){if(e.lifePoints<=0)return document.querySelector("#retaliationModal").classList.remove("open"),document.querySelector("#gameOverModal").classList.add("open"),document.querySelector("#gameOverModal p:first-of-type").innerHTML="".concat(t.name,", you are the winner :)"),document.querySelector("#gameOverModal p:last-of-type").innerHTML="".concat(e.name,", you have lost :("),!0}),c(this,"detectTurn",function(){document.querySelector("#player".concat(o.currentPlayer.id)).classList.add("current"),setTimeout(o.highlightMoves,500)}),c(this,"changeTurn",function(){var e,r=t(document.querySelectorAll(".sidebar"));try{for(r.s();!(e=r.n()).done;){e.value.classList.remove("current")}}catch(a){r.e(a)}finally{r.f()}1===o.currentPlayer.id?o.currentPlayer=o.players[1]:o.currentPlayer=o.players[0],o.detectTurn()}),this.players=a,this.gridSquares=document.querySelectorAll(".grid-item"),this.currentPlayer=null};c(o,"generateMap",function(){var e=document.querySelector("#game-board"),t=0,r=1;e.innerHTML="";for(var a=0;a<81;a++)t++,e.innerHTML+="<div class='grid-item' data-row=".concat(r," data-column=").concat(t,"></div>"),9===t&&(t=0,r++)});var i=o;exports.default=i;
},{"./assets":"RI4N"}],"QdeU":[function(require,module,exports) {
"use strict";var e=t(require("./player")),r=t(require("./game")),n=require("./assets");function t(e){return e&&e.__esModule?e:{default:e}}r.default.generateMap();var a=function(){document.querySelector("#gameOverModal").classList.remove("open");var t=new e.default("Ironman",n.ironman,n.weapon1).generate(),a=new e.default("Cap America",n.capShield,n.weapon0,t.id).generate();r.default.generateMap(),new r.default([t,a]).newGame()};document.querySelector("#newGame").addEventListener("click",a),document.querySelector("#newGame2").addEventListener("click",a),document.querySelector("#rules").addEventListener("click",function(){document.querySelector("#rulesModal").classList.add("open")}),document.querySelector("#closeRules").addEventListener("click",function(){document.querySelector("#rulesModal").classList.remove("open")});
},{"./player":"eDsD","./game":"IEHn","./assets":"RI4N"}]},{},["QdeU"], null)
//# sourceMappingURL=app.0a2a647f.js.map