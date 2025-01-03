// import path from "node:path";
// import { fileURLToPath } from "node:url";
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { hideBin } from "yargs/helpers";
import { keyPug } from "./key-pug.mjs";
import { keyTs } from "./key-ts.mjs";

import TerserPlugin from "terser-webpack-plugin";

const app = "app/";
const dist = "dist/";

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
    wget: {
        src: app + "wget/**/*",
        watch: app + "wget/**/*",
        dist: dist + "wget/",
    },
    svgSprite: {
        src: app + "svg/**/*.svg",
        watch: app + "svg/**/*.svg",
        dist: dist + "sprite/",
    },
};

export const pathFiles = config.onTs ? paths.scripts.srcTs : paths.scripts.src;

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

export const webpackConfig = {
    entry: {
        main: "./" + pathFiles,
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        followSymlinks: true,
        stdin: false,
    },
    mode: config.mode.isDev ? "development" : "production",
    output: {
        filename: config.scriptsFileNameOutput,
        publicPath: "/",
    },
    resolve: {
        alias: alias,
        extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_fnames: true,
                    keep_classnames: true,
                    compress: {
                        keep_classnames: true,
                        keep_fnames: true,
                    },
                    mangle: true,
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
};
