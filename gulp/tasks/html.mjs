"use strict";

import { src, dest } from "gulp";
import { paths, config } from "../config/config.mjs";
import fileinclude from "gulp-file-include";
import formatHtml from "gulp-format-html";
import browsersync from "browser-sync";

const clean = () => {
    return src(paths.html.src)
        .pipe(fileinclude())
        .pipe(formatHtml())
        .pipe(dest(paths.html.dist))
        .on("end", browsersync.reload);
};

export default clean;
