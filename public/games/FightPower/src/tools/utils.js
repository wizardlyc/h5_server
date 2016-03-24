/**
 * Created by guolei on 16/3/21.
 */
let Utils = Utils || {};
const Spine = require('pixi-spine').Spine;

Utils.removeRepeat = function (array) {
    return Array.from(new Set(array));
};

Utils.random = function (min, max) {
    return Math.floor((Math.random() * (max - min) + min));
};

Utils.createSprite = function (g_res) {
    return new PIXI.Sprite(PIXI.loader.resources[g_res].texture)
};

Utils.createSpine = function (g_res) {
    return new Spine(PIXI.loader.resources[g_res].spineData)
};

Utils.scaleToWindow = function (renderer,stage) {
    var scaleX = window.innerWidth / 480;
    var scaleY = window.innerHeight / 754;
    var scale = Math.min(scaleX, scaleY);

    var width = 480 * scale;
    var height = 754 * scale;

    var canvas = renderer.view;
    canvas.style.padding = 0;
    canvas.style.margin = 0;

    var margin = (window.innerWidth - width) / 2;
    canvas.style.marginLeft = margin + "px";
    canvas.style.marginRight = margin + "px";

    //canvas.style.transformOrigin = "0 0";
    //canvas.style.transform = "scale(" + scale + ")";

    //renderer.autoResize = true;
    renderer.resize(width, height);
    stage.scale.x = scale;
    stage.scale.y = scale;
};
module.exports = Utils;
