/**
 * Created by guolei on 16/3/21.
 */
const res = {
    "catSpine":"./assets/animations/skeleton.json",
    "game_bg":"./assets/img/background_fight_snow.png",
    "diamond_normal":"./assets/img/text_diamond_normal.png",
    "diamond_select":"./assets/img/text_diamond_select.png",
    'icon':'./assets/img/icon.png'
};
let g_resources = [];
for (let i in res) {
    g_resources.push(res[i]);
}

module.exports = {res: res, g_res: g_resources};