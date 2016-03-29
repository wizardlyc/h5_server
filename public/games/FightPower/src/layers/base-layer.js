/**
 * Created by guolei on 16/3/14.
 */
const RendererManager = require("../tools/renderer-manager");
const Utils = require('../tools/utils');

const BaseLayer = function () {
    let that = {};
    that.updateEnable = true;

    (()=> {
        that.node = new PIXI.Container();
        Utils.scaleToWindow(RendererManager.renderer, that.node);
    })();

    var stats = new Stats();
    (()=> {
        stats.setMode(1);
        // align top-left
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    })();


    that.init = function () {
        _lastTime = new Date().getTime();
        requestAnimationFrame(beforeUpdate);
    };

    that.update = function (dt) {
        if (!that.updateEnable)return;
    };

    let _lastTime = 0;
    function beforeUpdate() {
        var current = new Date().getTime();
        var dt = (current - _lastTime) / 1000; // seconds
        stats.begin();
        that.update(dt);
        RendererManager.renderer.render(that.node);
        stats.end();
        _lastTime = current;
        requestAnimationFrame(beforeUpdate);
    }

    return that;
};

module.exports = BaseLayer;