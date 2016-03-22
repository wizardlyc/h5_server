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
    layout: [1, 4],
    children: [
        {
            component: 'Layout',
            position: {x: 0, y: 0},
            width: 200,
            height: 50,
            layout: [2, 1],
            children: [
                {
                    id: 'gold',
                    component: 'Button',
                    image: {
                        "default": "./assets/img/text_diamond_select.png",
                        "down": "./assets/img/text_diamond_normal.png"
                    },
                    position: 'center',
                    width: 157,
                    height: 46
                },
                {
                    id: 'gold_num',
                    text: '1111111',
                    font: {
                        size: '26px',
                        family: 'Skranji',
                        color: 'yellow'
                    },
                    component: 'Label',
                    position: {x: -10, y: 0},
                    width: 100,
                    height: 50
                }
            ]
        },
        {
            component: 'Layout',
            position: {x: 0, y: 50},
            width: 170,
            height: 300,
            layout: [2, 3],
            children: [
                {
                    id: 'attack',
                    text: 'attack:',
                    font: {
                        size: '26px',
                        family: 'Skranji',
                        color: 'white'
                    },
                    component: 'Label',
                    //image:{ "default": "./assets/img/bomb1.png", "down": "./assets/img/bomb1-selected.png" },
                    position: 'center',
                    width: 110,
                    height: 50
                },
                {
                    id: 'attack_num',
                    text: '111',
                    font: {
                        size: '26px',
                        family: 'Skranji',
                        color: 'blue'
                    },
                    component: 'Label',
                    position: 'center',
                    width: 110,
                    height: 50
                },
                {
                    id: 'life',
                    text: 'life:',
                    font: {
                        size: '26px',
                        family: 'Skranji',
                        color: 'red'
                    },
                    component: 'Label',
                    position: 'center',
                    width: 110,
                    height: 50
                },
                {
                    id: 'life_num',
                    text: '200',
                    font: {
                        size: '26px',
                        family: 'Skranji',
                        color: 'gray'
                    },
                    component: 'Label',
                    position: 'center',
                    width: 110,
                    height: 50
                },
                null,
                null

            ]
        },
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
                    id: 'shopping',
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