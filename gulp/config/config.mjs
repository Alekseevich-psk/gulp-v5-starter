import path from "node:path";
import { fileURLToPath } from "node:url";

import { hideBin } from "yargs/helpers";
import { keyPug } from "./key-pug.mjs";
import { keyTs } from "./key-ts.mjs";

const app = "app/";
const dist = "dist/";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = (function () {
    const startConfig = hideBin(process.argv);

    for (const key in startConfig) {
        if (Object.prototype.hasOwnProperty.call(startConfig, key)) {
            const element = startConfig[key];
            if (element === "--production" || element === "build") return true;
        }
    }

    return false;
})();

const isDev = !isProd;

const aliasSections = "Sections";
const aliasComponents = "Components";
const aliasElements = "Elements";

export const config = {
    mode: {
        isDev: isDev,
        isProd: isProd,
    },
    onPug: keyPug,
    onTs: keyTs,
    scriptsFileNameOutput: "scripts.js",
};

export const paths = {
    app: app,
    dist: dist,
    jsConfig: "./jsconfig.json",
    tsConfig: "./tsconfig.json",
    keyPug: "gulp/config/key-pug.mjs",
    keyTs: "gulp/config/key-ts.mjs",
    components: app + "pages/components",
    sections: app + "pages/sections",
    elements: app + "pages/elements",
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
        srcTs: app + "scripts/main.ts",
        watch: app + "/**/*.{js,mjs,ts}",
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
        src: app + "images/**/*.{jpg,png,svg,gif,ico,webp,jpeg}",
        watch: app + "images/**/*.{jpg,png,svg,gif,ico,webp}",
        dist: dist + "images/",
    },
    assets: {
        src: app + "assets/**/*",
        watch: app + "assets/**/*",
        dist: dist + "assets/",
    },
    svgSprite: {
        src: app + "svg/**/*.svg",
        watch: app + "svg/**/*.svg",
        dist: dist + "sprite/",
    },
};

export const alias = {
    [aliasSections]: "../../" + paths.sections,
    [aliasComponents]: "../../" + paths.components,
    [aliasElements]: "../../" + paths.elements,
};

export const jsConfig = {
    compilerOptions: {
        moduleResolution: "node",
        noImplicitAny: true,
        module: "es6",
        target: "es5",
        allowJs: true,
        baseUrl: "./",
        paths: {
            [aliasSections + "/*"]: [paths.sections + "/*"],
            [aliasComponents + "/*"]: [paths.components + "/*"],
            [aliasElements + "/*"]: [paths.elements + "/*"],
        },
    },
};
