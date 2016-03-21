/**
 * Created by guolei on 16/3/15.
 */

const Conf = require("../tools/conf");

const DemoLayer = {
    id: 'main',
    component: 'Window',
    padding: 4,
    position: {x: 0, y: 0},
    width: Conf.Canvas.width,
    height: Conf.Canvas.height,
    layout: [1, 3],
    children: [
        null,
        null,
        {
            component: 'Layout',
            position: {x: 0, y: 0},
            width: Conf.Canvas.width - 8,
            height: 150,
            layout: [4, 1],
            children: [
                {
                    id: 'feed',
                    text: 'feed',
                    font: {
                        size: '26px',
                        family: 'Skranji',
                        color: 'white'
                    },
                    component: 'Button',
                    //image:{ "default": "./assets/img/bomb1.png", "down": "./assets/img/bomb1-selected.png" },
                    position: 'center',
                    width: 110,
                    height: 50
                },
                {
                    id: 'bathe',
                    text: 'bathe',
                    font: {
                        size: '26px',
                        family: 'Skranji',
                        color: 'blue'
                    },
                    component: 'Button',
                    position: 'center',
                    width: 110,
                    height: 50
                },
                {
                    id: 'shop',
                    text: 'shop',
                    font: {
                        size: '26px',
                        family: 'Skranji',
                        color: 'green'
                    },
                    component: 'Button',
                    position: 'center',
                    width: 110,
                    height: 50
                },
                {
                    id: 'exercise',
                    text: 'exercise',
                    font: {
                        size: '26px',
                        family: 'Skranji',
                        color: 'gray'
                    },
                    component: 'Button',
                    position: 'center',
                    width: 110,
                    height: 50
                }
            ]
        }
    ]
};
module.exports = DemoLayer;