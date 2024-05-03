"use strict";

import { src, dest } from "gulp";
import { paths } from "./config.mjs";
import ttf2woff from "gulp-ttf2woff";
import ttf2woff2 from "gulp-ttf2woff2";

const fontsToWoff = async () => {
    src(paths.ttf2Woff.src).pipe(ttf2woff()).pipe(dest(paths.ttf2Woff.dist));
    return src(paths.ttf2Woff.src).pipe(ttf2woff2()).pipe(dest(paths.ttf2Woff.dist));
};

export default fontsToWoff;
