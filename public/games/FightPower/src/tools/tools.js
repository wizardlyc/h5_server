/**
 * Created by guolei on 16/3/21.
 */
const Utils = require('./utils');
const Conf = require('./conf');

let Tools = Tools || {};
Tools.utils = Utils;
Tools.conf = Conf;
module.exports = Tools;