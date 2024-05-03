"use strict";

import { src, dest } from "gulp";
import { paths } from "./config.mjs";

const fonts = () => {
    return src(paths.fonts.src)
        .pipe(dest(paths.fonts.dist));
};

export default fonts;
