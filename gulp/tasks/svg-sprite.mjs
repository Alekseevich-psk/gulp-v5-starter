"use strict";

import fs from "fs";
import { paths } from "../config/config.mjs";
import { src, dest, watch } from "gulp";
import svgMin from "gulp-svgmin";
import sprite from "gulp-svg-sprite";
import browsersync from "browser-sync";

const svgSprite = () => {
    if (!fs.existsSync(paths.svgSprite.src.replace("**/*", ""))) return;
    
    return src(paths.svgSprite.src)
        .pipe(
            svgMin({
                multipass: true,
                js2svg: {
                    pretty: true,
                    indent: 2,
                },
                full: true,
                plugins: ["removeDoctype", "removeComments", "sortAttrs"],
            })
        )
        .pipe(
            sprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg",
                    },
                },
            })
        )
        .pipe(dest(paths.svgSprite.dist))
        .on("end", browsersync.reload);
};

export default svgSprite;
