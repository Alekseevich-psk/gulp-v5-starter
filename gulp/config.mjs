import { hideBin } from "yargs/helpers";
import { keyPug } from "./key-pug.mjs";

const app = "app/";
const dist = "dist/";

const isProd = hideBin(process.argv)[1] === "--production";
const isDev = !isProd;

export const config = {
    mode: {
        isDev: isDev,
        isProd: isProd,
    },
    onPug: keyPug,
};

export const paths = {
    app: app,
    dist: dist,
    keyPug: 'gulp/key-pug.mjs',
    html: {
        src: app + "pages/*.html",
        watch: app + "pages/**/*.html",
        dist: dist + "/",
    },
    pug: {
        src: app + "pages/*.pug",
        watch: app + "pages/**/*.pug",
        dist: dist + "/",
    },
    styles: {
        fonts: app + "styles/fonts.scss",
        src: app + "styles/main.scss",
        watch: app + "/**/*.scss",
        dist: dist + "css/",
    },
    video: {
        src: app + "/video/*.{mp4,webm,ogv,swf}",
        watch: app + "/video/*.{mp4,webm,ogv,swf}",
        dist: dist + "video/",
    },
    scripts: {
        src: app + "scripts/main.js",
        watch: app + "/**/*.js",
        dist: dist + "js/",
    },
    fonts: {
        srcFs: app + "fonts/",
        src: app + "fonts/*.{woff,woff2}",
        watch: app + "fonts/*.{woff,woff2}",
        dist: dist + "fonts/",
    },
    ttf2Woff: {
        src: app + "fonts/ttf/",
        dist: app + "fonts/",
    },
    images: {
        src: app + "images/**/*.{jpg,png,svg,gif,ico,webp}",
        watch: app + "images/**/*.{jpg,png,svg,gif,ico,webp}",
        dist: dist + "images/",
    },
};
