"use strict";

import { paths, config } from "./gulp/config/config.mjs";

import gulp from "gulp";
import gulpIf from "gulp-if";

import switchMode from "./gulp/tasks/switch-mode.mjs";
import html from "./gulp/tasks/html.mjs";
import pug from "./gulp/tasks/pug.mjs";
import styles from "./gulp/tasks/styles.mjs";
import { scripts, scriptsWatchTs } from "./gulp/tasks/scripts.mjs";
import serve from "./gulp/tasks/serve.mjs";
import images from "./gulp/tasks/images.mjs";
import video from "./gulp/tasks/video.mjs";
import fonts from "./gulp/tasks/fonts.mjs";
import zipDist from "./gulp/tasks/zip.mjs";
import ttfToWoff from "./gulp/tasks/ttf-woff.mjs";
import fontsInStyle from "./gulp/tasks/fonts-in-style.mjs";
import clean from "./gulp/tasks/clean.mjs";
import create from "./gulp/tasks/create.mjs";

gulp.task(switchMode);
gulp.task(zipDist);
gulp.task(ttfToWoff);
gulp.task(fontsInStyle);
gulp.task(create);
gulp.task(styles);
gulp.task(scripts);
gulp.task(pug);
gulp.task(images);
gulp.task(fonts);

const watchFiles = () => {
    gulpIf(
        config.onPug,
        gulp.watch(paths.pug.watch, gulp.parallel(pug)),
        gulp.watch(paths.html.watch, gulp.parallel(html))
    );

    gulpIf(
        config.onTs,
        gulp.watch(paths.scripts.watchTs, gulp.parallel(scriptsWatchTs)),
        gulp.watch(paths.scripts.watch, gulp.parallel(scripts))
    );

    gulp.watch(paths.pug.watch, gulp.parallel(pug));
    gulp.watch(paths.styles.watch, gulp.parallel(styles));
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
gulp.task("default", watch);