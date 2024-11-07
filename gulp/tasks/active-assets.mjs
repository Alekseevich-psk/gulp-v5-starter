"use strict";

import fs from "fs";
import { paths } from "../config/config.mjs";
import { src, dest, watch } from "gulp";
import browsersync from "browser-sync";

const activeAssets = async () => {
    if (!fs.existsSync(paths.assets.src.replace("**/*", ""))) return;
    
    return src(paths.assets.src, { encoding: false })
        .pipe(dest(paths.assets.dist))
        .on("end", browsersync.reload);
};

export default activeAssets;
