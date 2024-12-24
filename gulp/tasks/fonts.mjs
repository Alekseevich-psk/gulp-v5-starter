"use strict";

import fs from "fs";
import { src, dest } from "gulp";
import { paths } from "../config/config.mjs";
import removeInnerBraces from "../snippets/removeInnerBraces.mjs";

const fonts = async () => {
    if (!fs.existsSync(removeInnerBraces(paths.fonts.src))) return;

    return src(paths.fonts.src, { encoding: false }).pipe(dest(paths.fonts.dist));
};

export default fonts;
