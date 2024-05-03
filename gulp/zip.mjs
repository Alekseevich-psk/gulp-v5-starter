"use strict";

import { src, dest } from "gulp";
import { paths } from "./config.mjs";
import zip from "gulp-zip";

const zipDist = () => {
    return src(paths.dist + "**/*.{html,jpg,png,svg,gif,ico,webp,video,js,css}")
        .pipe(zip("archive.zip"))
        .pipe(dest(paths.dist));
};

export default zipDist;
