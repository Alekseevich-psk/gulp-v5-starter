"use strict";

import { src, dest } from "gulp";
import { paths } from "../config/config.mjs";

const fonts = () => {
    return src(paths.fonts.src, { encoding: false })
        .pipe(dest(paths.fonts.dist));
};

export default fonts;
