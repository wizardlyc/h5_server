/**
 * Created by guolei on 16/3/14.
 */
const RendererManager = require("../tools/renderer-manager");
const Utils = require('../tools/utils');
const Scale = require('../tools/scaleToWindow');
const BaseLayer = function () {
    let that = {};

    var stats = new Stats();
    stats.setMode(1);
    // align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);


    that.node = new PIXI.Container();

    let _lastTime = 0;
    let renderer = RendererManager.renderer;
    Utils.scaleToWindow(renderer,that.node);

    that.clickButton = function (name) {

    };

    that.init = function () {
        _lastTime = new Date().getTime();
        requestAnimationFrame(beforeUpdate);
    };

    that.update = function (dt) {
        renderer.render(that.node);
    };

    function beforeUpdate() {
        var current = new Date().getTime();
        var dt = (current - _lastTime) / 1000; // seconds
        stats.begin();
        that.update(dt);
        stats.end();
        _lastTime = current;

        requestAnimationFrame(beforeUpdate);
    }

    return that;
};

module.exports = BaseLayer;