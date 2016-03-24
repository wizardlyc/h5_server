/**
 * Created by guolei on 16/3/14.
 */
const renderManager = require("./tools/renderer-manager");
const configManager = require('./tools/config-manager');
//const GameScene = require("./layers/game-scene");
const DemoLayer = require('./layers/demo-layer');
const Resources = require('./resource').g_res;
const petData = require('./data/pet-data');
const Scale = require('./tools/scaleToWindow');
(() => {
    renderManager.init();
    configManager.init(function () {
        petData.init();
    });

    ////
    //window.addEventListener('resize',function(event){
    //    let scale =  Scale(renderManager.renderer.view);
    //    //renderManager.renderer.view.scale.x = scale;
    //    //renderManager.renderer.view.scale.y = scale;
    //});
    if (PIXI.loader) {
        PIXI.loader.add(Resources).load(function () {
            let game = DemoLayer();
            game.init();
        });
    }

})();
