/**
 * Created by guolei on 16/3/14.
 */
const renderManager = require("./tools/renderer-manager");
//const GameScene = require("./layers/game-scene");
const DemoLayer = require('./layers/demo-layer');
const Resources = require('./resource').g_res;
(function () {
    renderManager.init();
    if (PIXI.loader) {
        PIXI.loader.add(Resources).load(function () {
            let game = DemoLayer();
            game.init();
        });
    }

}());
