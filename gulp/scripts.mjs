"use strict";

import path from "node:path";
import { fileURLToPath } from "node:url";
import { src, dest } from "gulp";
import { paths, config } from "./config.mjs";

import webpackStream from "webpack-stream";
import browsersync from "browser-sync";

// const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathFiles = () => (config.onTs ? paths.scripts.srcTs : paths.scripts.src);

const webpackConfig = {
    entry: {
        main: "./" + pathFiles(),
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        followSymlinks: true,
        stdin: false,
    },
    mode: config.mode.isDev ? "development" : "production",
    output: {
        filename: "scripts.js",
        publicPath: "/",
    },
    resolve: {
        alias: {
            Components: path.resolve(__dirname, "../" + paths.components),
            Sections: path.resolve(__dirname, "../" + paths.sections),
            Elements: path.resolve(__dirname, "../" + paths.elements),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
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

const scriptsWatch = () => {
    return src(paths.scripts.srcTs)
        .pipe(dest(paths.scripts.dist))
        .on("end", browsersync.reload);
};

const scripts = () => {
    return src(paths.scripts.srcTs)
        .pipe(webpackStream(webpackConfig), null, function (err, stats) {
            console.log("err " + err);
            console.log("stats " + stats);
        })
        .pipe(dest(paths.scripts.dist))
        .on("end", browsersync.reload);
};

export { scripts, scriptsWatch };
