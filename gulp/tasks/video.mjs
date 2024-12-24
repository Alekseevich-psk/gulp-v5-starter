"use strict";

import fs from "fs";
import { src, dest } from "gulp";
import { paths } from "../config/config.mjs";
import removeInnerBraces from "../snippets/removeInnerBraces.mjs";

const video = async () => {
    if (!fs.existsSync(removeInnerBraces(paths.video.src))) {
        return console.log("no video folder");
    }

    return src(paths.video.src, { encoding: false }).pipe(dest(paths.video.dist));
};

export default video;
