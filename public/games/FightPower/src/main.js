/**
 * Created by guolei on 16/3/14.
 */
const renderManager = require("./renderer-manager");
//const GameScene = require("./layers/game-scene");
const DemoLayer = require('./layers/demo-layer');
(function () {
    renderManager.init();

    let game = DemoLayer(renderManager.renderer);
    game.init();
}());
