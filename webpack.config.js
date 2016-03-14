var path = require('path');

var project_name = "/FightPower";

var entry_path = path.join(__dirname, "public", "games");
module.exports = {
    //入口文件
    entry: {
        FightPower:entry_path+project_name+"/src/main.js"
    },
    output: {
        path: entry_path+project_name,
        filename: "[name].all.js"
    },
    devtool: 'eval',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.json$/,
                // We could restrict using json-loader only on .json files in the
                // node_modules/pixi.js directory, but the ability to load .json files
                // could be useful elsewhere in our app, so I usually don't.
                //include: path.resolve(__dirname, 'node_modules/pixi.js'),
                loader: 'json'
            },

//            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
//            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
        ],
        postLoaders: [
            {
                include: path.resolve(__dirname, 'node_modules/pixi.js'),
                loader: 'transform?brfs'
            }
        ]
    }
};
