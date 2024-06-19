"use strict";

import { src, dest } from "gulp";
import { paths } from "../config/config.mjs";

const video = () => {
    return src(paths.video.src, { encoding: false })
            .pipe(dest(paths.video.dist));
};

export default video;
