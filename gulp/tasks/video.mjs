"use strict";

import fs from "fs";
import { src, dest } from "gulp";
import { paths } from "../config/config.mjs";

const video = () => {
    if (!fs.existsSync(paths.video.src.replace("**/*", ""))) return;
    
    return src(paths.video.src, { encoding: false })
        .pipe(dest(paths.video.dist));
};

export default video;
