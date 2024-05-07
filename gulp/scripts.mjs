"use strict";

import { src, dest } from "gulp";
import { paths, config } from "./config.mjs";

import webpackStream from "webpack-stream";
import browsersync from "browser-sync";

const webpackConfig = {
    entry: {
        main: "./" + paths.scripts.src
    },
    mode: config.mode.isDev ? "development" : "production",
    output: {
        filename: "[name].scripts.js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", { targets: "defaults" }]],
                    },
                },
            },
        ],
    },
};

const scripts = () => {
    return src(paths.scripts.src)
        .pipe(webpackStream(webpackConfig))
        .pipe(dest(paths.scripts.dist))
        .on("end", browsersync.reload);
};

export default scripts;
