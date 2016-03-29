/**
 * Created by guolei on 16/3/15.
 */

const Conf = require("../tools/conf");
const size = 60;

function copyObject(obj, id) {
    let that = {};
    for (let i in obj) {
        that[i] = obj[i];
    }
    that.id = id;
    return that;
}

const PetInfo = {
    id: 'petInfo',
    component: 'Layout',
    layout: [5, 1],
    position: {x: 0, y: 0},
    width: Conf.Canvas.width,
    height: 200,
    children: [
        {
            id: 'infoIcon',
            component: 'Sprite',
            image: "./assets/img/icon.png",
            position: {x: 0, y: 0},
            width: 90,
            height: 90
        },
        {
            id: 'infoText',
            component: 'Layout',
            position: {x: -80, y: 0},
            width: 300,
            height: 90,
            layout: [1, 3],
            children: [
                {
                    id: 'name&level',
                    component: 'Label',
                    text: 'MoNv',
                    font: {
                        size: '20px',
                        family: 'Skranji',
                        color: 'yellow'
                    },
                    position: {x: 0, y: 0},
                    width: 250,
                    height: 30
                },
                {
                    id: 'attack',
                    component: 'Label',
                    text: '814N/DPS',
                    font: {
                        size: '20px',
                        family: 'Skranji',
                        color: 'yellow'
                    },
                    position: {x: 0, y: 0},
                    width: 250,
                    height: 30
                },
                {
                    id: 'DPS',
                    component: 'Label',
                    text: 'DPS 0.38%',
                    font: {
                        size: '20px',
                        family: 'Skranji',
                        color: 'yellow'
                    },
                    position: {x: 0, y: 0},
                    width: 250,
                    height: 30
                }

            ]

        },
        {
            id: 'levelText',
            component: 'Label',
            text: 'Lv.1650',
            font: {
                size: '20px',
                family: 'Skranji',
                color: 'yellow'
            },
            position: {x: 0, y: -30},
            width: 90,
            height: 90
        },
        {
            id: 'levelUp',
            component: 'Button',
            text: 'levelUp',
            font: {
                size: '20px',
                family: 'Skranji',
                color: 'yellow'
            },
            position: {x: -10, y: 0},
            width: 90,
            height: 90
        },
        {
            id: 'levelUp',
            component: 'Layout',
            position: {x: -20, y: 0},
            width: 90,
            height: 90,
            layout: [1, 2],
            children: [
                {
                    id: 'X10',
                    component: 'Button',
                    text: 'X10',
                    font: {
                        size: '20px',
                        family: 'Skranji',
                        color: 'yellow'
                    },
                    position: {x: 0, y: 0},
                    width: 90,
                    height: 45
                }, {
                    id: 'X100',
                    component: 'Button',
                    text: 'X100',
                    font: {
                        size: '20px',
                        family: 'Skranji',
                        color: 'yellow'
                    },
                    position: {x: 0, y: 0},
                    width: 90,
                    height: 45
                },
            ]
        }

    ]

};

const PetSkills = {
    id: 'petSkills',
    component: 'Layout',
    position: {x: 0, y: 0},
    padding: 2,
    width: Conf.Canvas.width,
    height: 100,
    layout: [7, 1],
    children: [
        {
            id: 'skill0',
            component: 'Button',
            text: 'skill0',
            font: {
                size: '20px',
                family: 'Skranji',
                color: 'yellow'
            },
            position: {x: 0, y: 0},
            width: size,
            height: size
        },
        {
            id: 'skill1',
            component: 'Button',
            text: 'skill1',
            font: {
                size: '20px',
                family: 'Skranji',
                color: 'yellow'
            },
            position: {x: 0, y: 0},
            width: size,
            height: size
        },
        {
            id: 'skill2',
            component: 'Label',
            text: 'skill2',
            font: {
                size: '20px',
                family: 'Skranji',
                color: 'yellow'
            },
            position: {x: 0, y: 0},
            width: size,
            height: size
        },
        {
            id: 'skill3',
            component: 'Button',
            text: 'skill3',
            font: {
                size: '20px',
                family: 'Skranji',
                color: 'yellow'
            },
            position: {x: 0, y: 0},
            width: size,
            height: size
        },
        {
            id: 'skill4',
            component: 'Button',
            text: 'skill4',
            font: {
                size: '20px',
                family: 'Skranji',
                color: 'yellow'
            },
            position: {x: 0, y: 0},
            width: size,
            height: size
        },
        {
            id: 'skill5',
            component: 'Button',
            text: 'skill5',
            font: {
                size: '20px',
                family: 'Skranji',
                color: 'yellow'
            },
            position: {x: 0, y: 0},
            width: size,
            height: size
        },
        {
            id: 'skill6',
            component: 'Button',
            text: 'skill6',
            font: {
                size: '20px',
                family: 'Skranji',
                color: 'yellow'
            },
            position: {x: 0, y: 0},
            width: size,
            height: size
        }
    ]
};

const PetBar = function (id) {
    let that = {
        id: id,
        component: 'Layout',
        position: {x: 0, y: 0},
        padding: 4,
        width: Conf.Canvas.width,
        height: 180,
        layout: [1, 2],
        children: [
            copyObject(PetInfo, id + 'info'),
            copyObject(PetSkills, id + 'skill')
        ]
    };
    return that;
};

const MainLayer = {
    id: 'main',
    component: 'Window',
    position: {x: 0, y: 0},
    width: Conf.Canvas.width,
    height: Conf.Canvas.height,
    layout: [1, 2],
    children: [
        {
            id: 'startGame',
            component: 'List',
            position: {x: 0, y: 0},
            padding: 4,
            width: Conf.Canvas.width,
            height: 1440,
            dragX: false,
            layout: [1, 8],
            children: [
                PetBar('petInfoBar0'),
                PetBar('petInfoBar1'),
                PetBar('petInfoBar2'),
                PetBar('petInfoBar3'),
                PetBar('petInfoBar4'),
                PetBar('petInfoBar5'),
                PetBar('petInfoBar6'),
                PetBar('petInfoBar7')

            ]
        }

    ]
};


module.exports = MainLayer;