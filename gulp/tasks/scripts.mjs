"use strict";

import { src, dest } from "gulp";
import { paths, config, alias } from "../config/config.mjs";

import webpackStream from "webpack-stream";
import browsersync from "browser-sync";

const pathFiles = config.onTs ? paths.scripts.srcTs : paths.scripts.src;

export const webpackConfig = {
    entry: {
        main: "./" + pathFiles,
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        followSymlinks: true,
        stdin: false,
    },
    mode: config.mode.isDev ? "development" : "production",
    output: {
        filename: config.scriptsFileNameOutput,
        publicPath: "/",
    },
    resolve: {
        alias: alias.js,
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

const tsProject = ts.createProject({
    noImplicitAny: true,
    module: "es6",
    target: "es5",
    allowJs: true,
    moduleResolution: "node",
});

const scripts = () => {
    return src(pathFiles)
        .pipe(webpackStream(webpackConfig), null, function (err, stats) {
            console.log("err " + err);
            console.log("stats " + stats);
        })
        .pipe(tsProject())
        .pipe(dest(paths.scripts.dist))
        .pipe(browsersync.reload({ stream: true }));
};

export default scripts;
