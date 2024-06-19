"use strict";

import { paths } from "../config/config.mjs";
import { src, dest, watch } from "gulp";
import browsersync from "browser-sync";

const images = () => {
    return (
        src(paths.images.src, { encoding: false })
            .pipe(dest(paths.images.dist))
            .on("end", browsersync.reload)
    );
};

export default images;