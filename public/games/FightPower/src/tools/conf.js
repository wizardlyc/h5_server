/**
 * Created by guolei on 16/3/14.
 */
let Conf = Conf || {};
const Width = 480, Height = 754;
Conf.Canvas = {
    width: Width,
    height: Height,
    posX_center: Width * 0.5,
    posY_center: Height * 0.5

};
Conf.ConfigType = {
    PetActions:'./assets/json/pet_actions-config.json',
    PetLevels:'./assets/json/pet_levels-config.json'
};

module.exports = Conf;