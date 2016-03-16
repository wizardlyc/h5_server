/**
 * Created by guolei on 16/3/16.
 */
const BaseLayer = require('./base-layer');
const Inherited = require("./../inherited");
const DemoLayout = require("../gui-layouts/demo-layout");

function DemoLayer(render) {
    let that = Inherited(BaseLayer(render));
    that.inheritOn("init", function () {

        let layer = EZGUI.Theme.load(["./assets/image-themes/demo-theme.json"], function (...args) {
            let gui = EZGUI.create(DemoLayout,"demo");

            for(let i in EZGUI.components){
                console.log("EZGUI.components",i,EZGUI.components[i]);
            }
            //console.log("EZGUI.components",EZGUI.components[i]);
            EZGUI.components.btn1.on('click', function (event) {
                console.log('clicked', event);
            });
            that.node.addChild(gui);

        });

    });


    return that;
}
module .exports = DemoLayer;