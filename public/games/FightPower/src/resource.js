/**
 * Created by guolei on 16/3/21.
 */
const res = {
    "catSpine":"./assets/animations/cat_5.json",
    "bomb":"./assets/img/bomb1.png"
};
let g_resources = [];
for (let i in res) {
    g_resources.push(res[i]);
}

module.exports = {res: res, g_res: g_resources};