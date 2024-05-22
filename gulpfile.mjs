"use strict";

import { paths, config } from "./gulp/config.mjs";

import gulp from "gulp";
import gulpIf from "gulp-if";

import switchPug from "./gulp/switch-pug.mjs";
import html from "./gulp/html.mjs";
import pug from "./gulp/pug.mjs";
import styles from "./gulp/styles.mjs";
import { scripts, scriptsWatch } from "./gulp/scripts.mjs";
import serve from "./gulp/serve.mjs";
import images from "./gulp/images.mjs";
import video from "./gulp/video.mjs";
import fonts from "./gulp/fonts.mjs";
import zipDist from "./gulp/zip.mjs";
import ttfToWoff from "./gulp/ttf-woff.mjs";
import fontsInStyle from "./gulp/fonts-in-style.mjs";
import clean from "./gulp/clean.mjs";

gulp.task(switchPug);
gulp.task(zipDist);
gulp.task(ttfToWoff);
gulp.task(fontsInStyle);

const watchFiles = () => {
    gulpIf(
        config.onPug,
        gulp.watch(paths.pug.watch, gulp.parallel(pug)),
        gulp.watch(paths.html.watch, gulp.parallel(html))
    );
    gulp.watch(paths.pug.watch, gulp.parallel(pug));
    gulp.watch(paths.styles.watch, gulp.parallel(styles));
    // gulp.watch(paths.scripts.watch, gulp.parallel(scripts));
    gulp.watch(paths.scripts.watchTs, gulp.parallel(scriptsWatch));
    gulp.watch(paths.images.watch, gulp.parallel(images));
    gulp.watch(paths.video.watch, gulp.parallel(video));
    gulp.watch(paths.fonts.watch, gulp.parallel(fonts));
};

export const build = gulp.series(
    clean,
    gulpIf(config.onPug, pug, html),
    gulp.parallel(styles, video, fonts, scripts, images)
);

export const watch = gulp.parallel(build, watchFiles, serve);
