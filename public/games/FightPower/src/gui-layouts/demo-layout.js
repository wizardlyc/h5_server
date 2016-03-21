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
            layout: [3, 1],
            children: [
                {
                    id: 'btn1',
                    text: 'btn1',
                    font: {
                        size: '30px',
                        family: 'Skranji',
                        color: 'white'
                    },
                    component: 'Button',
                    //image:{ "default": "./assets/img/bomb1.png", "down": "./assets/img/bomb1-selected.png" },
                    position: 'center',
                    width: 80,
                    height: 50
                },
                {
                    id: 'btn2',
                    text: 'btn2',
                    font: {
                        size: '30px',
                        family: 'Skranji',
                        color: 'blue'
                    },
                    component: 'Button',
                    position: 'center',
                    width: 80,
                    height: 50
                },
                {
                    id: 'btn3',
                    text: 'btn3',
                    font: {
                        size: '30px',
                        family: 'Skranji',
                        color: 'green'
                    },
                    component: 'Button',
                    position: 'center',
                    width: 80,
                    height: 50
                }
            ]
        }
    ]
};
module.exports = DemoLayer;