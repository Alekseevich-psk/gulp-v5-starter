"use strict";

import { src, dest } from "gulp";
import { paths } from "../config/config.mjs";
import gulpPug from "gulp-pug";
import browsersync from "browser-sync";

const pug = () => {
    return src(paths.pug.src)
        .pipe(gulpPug({ pretty: true }))
        .pipe(dest(paths.pug.dist))
        .on("end", browsersync.reload);
};

export default pug;
