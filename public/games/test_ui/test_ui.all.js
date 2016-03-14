/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\n/**\n * Created by wizard on 16/3/7.\n */\n\nwindow.onload = function () {\n  // create an new instance of a pixi stage\n\n  var renderer = PIXI.autoDetectRenderer(480, 640);\n  //renderer.resize(800, 600);\n  document.body.appendChild(renderer.view);\n\n  var stage = new PIXI.Container();\n\n  renderer.view.style.position = \"absolute\";\n  renderer.view.style.display = \"block\";\n  renderer.autoResize = true;\n  //renderer.resize(window.innerWidth, window.innerHeight);\n\n  var guiObj = {\n    id: 'main',\n    component: 'Window',\n    header: { id: 'ttl', skin: 'blueheader', position: { x: 0, y: 0 }, height: 40, text: 'Title' },\n    draggable: true,\n    padding: 4,\n    position: { x: 0, y: 0 },\n    width: 600,\n    height: 550,\n    layout: [1, 3],\n    children: [{\n      component: 'Layout',\n      position: { x: 0, y: 0 },\n      width: 500,\n      height: 150,\n      layout: [2, 1],\n      children: [{\n        id: 'btn1',\n        text: 'btn',\n        font: {\n          size: '42px',\n          family: 'Skranji',\n          color: 'red'\n        },\n        component: 'Button',\n        skin: 'bluebutton',\n        position: 'center',\n        width: 190,\n        height: 80\n      }, {\n        component: 'Layout',\n        position: { x: 0, y: 0 },\n        width: 250,\n        height: 140,\n        layout: [1, 4],\n        children: [{ id: 'radio1', text: 'choice 1', component: 'Radio', group: 1, position: 'center', width: 30, height: 30 }, { id: 'radio2', text: 'choice 2', component: 'Radio', group: 1, position: 'center', width: 30, height: 30 }, { id: 'radio3', text: 'choice 3', component: 'Radio', group: 1, position: 'center', width: 30, height: 30 }, { id: 'radio4', text: 'choice 4', component: 'Radio', group: 1, position: 'center', width: 30, height: 30 }]\n      }]\n    }, {\n      id: 'hlist1',\n      component: 'List',\n      padding: 3,\n      position: 'center',\n      width: 400,\n      height: 150,\n      layout: [4, null],\n      children: [{ component: 'Button', position: 'center', width: 90, height: 120 }, null, { component: 'Button', position: 'center', width: 90, height: 120 }, { component: 'Button', position: 'center', width: 90, height: 120 }, { component: 'Button', position: 'center', width: 90, height: 120 }, { component: 'Button', position: 'center', width: 90, height: 120 }, { component: 'Button', position: 'center', width: 90, height: 120 }, { component: 'Button', position: 'center', width: 90, height: 120 }, { component: 'Button', position: 'center', width: 90, height: 120 }, { component: 'Button', position: 'center', width: 90, height: 120 }, { component: 'Button', position: 'center', width: 90, height: 120 }]\n    }, {\n      id: 'btn2',\n      component: 'Checkbox',\n      position: 'center',\n      text: 'Checkbox',\n      width: 30,\n      height: 30\n    }]\n  };\n\n  var guiContainer, theme;\n\n  function onAssetsLoaded() {\n    requestAnimationFrame(animate);\n    //sprite.setTexture(texture2);\n    EZGUI.Theme.load(['./assets/ui/kenney-theme/kenney-theme.json'], function () {\n      guiContainer = EZGUI.create(guiObj, 'kenney'); //new EZGUI.GUISprite(guiObj, guiTheme);\n      //guiContainer.visible = false;\n      EZGUI.components.btn1.on('click', function (event) {\n        console.log('clicked', event);\n      });\n      stage.addChild(guiContainer);\n    });\n\n    function animate() {\n      requestAnimationFrame(animate);\n      renderer.render(stage);\n    }\n  }\n  onAssetsLoaded();\n};\n\n/*****************\n ** WEBPACK FOOTER\n ** ./public/games/test_ui/src/game.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./public/games/test_ui/src/game.js?");

/***/ }
/******/ ]);