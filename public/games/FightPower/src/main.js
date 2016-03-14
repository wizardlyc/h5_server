/**
 * Created by guolei on 16/3/14.
 */
const renderManager = require("./renderer-manager");
const GameScene = require("./ui/game-scene");
(function () {
    renderManager.init();

    let game = GameScene(renderManager.renderer);
    game.init();
}());
