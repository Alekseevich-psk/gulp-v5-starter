"use strict";

import sassAlias from "../modules/sass-alias.mjs";

import { src, dest } from "gulp";
import { paths, config } from "../config/config.mjs";

import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
import gulpIf from "gulp-if";
import groupMedia from "gulp-group-css-media-queries";
import rename from "gulp-rename";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import browsersync from "browser-sync";

const scss = gulpSass(nodeSass);

const styles = () => {
    return src(paths.styles.src)
        .pipe(sassAlias())
        .pipe(gulpIf(config.mode.isDev, sourcemaps.init()))
        .pipe(scss())
        .pipe(groupMedia())
        .pipe(
            autoprefixer({
                cascade: false,
                grid: true,
            })
        )
        .pipe(
            gulpIf(
                config.mode.isProd,
                cleanCSS({
                    compatibility: "ie8",
                    level: {
                        1: {
                            specialComments: 0,
                            removeEmpty: true,
                            removeWhitespace: true,
                        },
                        2: {
                            mergeMedia: true,
                            removeEmpty: true,
                            removeDuplicateFontRules: true,
                            removeDuplicateMediaBlocks: true,
                            removeDuplicateRules: true,
                            removeUnusedAtRules: false,
                        },
                    },
                })
            )
        )
        .pipe(gulpIf(config.mode.isDev, sourcemaps.write("./maps/")))
        .pipe(dest(paths.styles.dist))
        .on("end", browsersync.reload);
};

export default styles;
