"use strict";

import { src, dest } from "gulp";
import { paths } from "../config/config.mjs";
import zip from "gulp-zip";

const zipDist = () => {
    return src(paths.dist + "**/*.{html,jpg,png,svg,gif,ico,webp,video,js,css}", {
        encoding: false,
    })
        .pipe(zip("archive.zip"))
        .pipe(dest(paths.dist));
};

export default zipDist;
