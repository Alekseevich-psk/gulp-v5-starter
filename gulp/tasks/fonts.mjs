"use strict";

import fs from "fs";
import { src, dest } from "gulp";
import { paths } from "../config/config.mjs";

const fonts = () => {
    if (!fs.existsSync(paths.fonts.src.replace("**/*", ""))) return;
    
    return src(paths.fonts.src, { encoding: false })
        .pipe(dest(paths.fonts.dist));
};

export default fonts;
