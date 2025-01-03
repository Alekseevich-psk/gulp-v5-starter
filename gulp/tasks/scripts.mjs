"use strict";

import { src, dest } from "gulp";
import { paths, webpackConfig, pathFiles } from "../config/config.mjs";

import webpackStream from "webpack-stream";
import browsersync from "browser-sync";

const scripts = () => {
    return src(pathFiles)
        .pipe(webpackStream(webpackConfig), null, function (err, stats) {
            console.log("err " + err);
            console.log("stats " + stats);
        })
        .pipe(dest(paths.scripts.dist))
        .pipe(browsersync.reload({ stream: true }));
};

export default scripts;
