import yargs from "yargs/yargs";

const argv = yargs(process.argv.slice(2)).option("dev", {
    alias: "d",
    type: "boolean",
    describe: "dev mode",
}).argv;

const app = "app/";
const dist = "dist/";
const onPug = true;

const isProd = argv.production;
const isDev = !isProd;

export const config = {
    mode: {
        isDev: isDev,
        isProd: isProd,
    },
    onPug: onPug,
};

export const paths = {
    app: app,
    dist: dist,
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
    libs: {
        src: app + "libs/libs.js",
        watch: app + "libs/**/*.js",
        dist: dist + "libs/",
    },
    fonts: {
        src: app + "fonts/*.{woff,woff2}",
        watch: app + "fonts/*.{woff,woff2}",
        dist: dist + "fonts/",
    },
    ttf2Woff: {
        src: app + "fonts/ttf/*.{otf,ttf,woff2,woff}",
        dist: app + "fonts/",
    },
    images: {
        src: app + "images/**/*.{jpg,png,svg,gif,ico,webp}",
        watch: app + "images/**/*.{jpg,png,svg,gif,ico,webp}",
        dist: dist + "images/",
    },
};
