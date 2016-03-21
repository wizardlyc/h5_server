/**
 * Created by guolei on 16/3/16.
 */
const BaseLayer = require('./base-layer');
const Inherited = require("./../tools/inherited");
const DemoLayout = require("../gui-layouts/demo-layout");
const Conf = require('../tools/conf');
const Resource = require('../resource').res;
const Utils = require('../tools/utils');

function DemoLayer() {
    const LayerJson = "./assets/themes/demo-theme.json";
    let that = Inherited(BaseLayer());
    that.inheritOn("init", function () {

        let layer = EZGUI.Theme.load([LayerJson], function () {
            let gui = EZGUI.create(DemoLayout, "demo");

            function ClickedOn(event, btn) {
                console.log('EZGUI.components', btn.guiID);
            }

            for (let i in EZGUI.components) {
                if (EZGUI.components[i].settings.component === "Button") {
                    EZGUI.components[i].on('click', ClickedOn);
                }
            }
            that.node.addChild(gui);

            let animation = Utils.createSpine(Resource.catSpine);
            animation.position.x = Conf.Canvas.posX_center;
            animation.position.y = Conf.Canvas.posY_center + 100;
            animation.scale.set(1.5);
            animation.state.setAnimationByName(0, 'idle', true);
            gui.addChild(animation);

            let sprite = Utils.createSprite(Resource.bomb);
            gui.addChild(sprite);

        });

    });

    return that;
}
module.exports = DemoLayer;