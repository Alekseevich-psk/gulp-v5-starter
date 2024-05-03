"use strict";

import { src, dest } from "gulp";
import { paths } from "./config.mjs";

const video = () => {
    return src(paths.video.src)
            .pipe(dest(paths.video.dist));
};

export default video;
