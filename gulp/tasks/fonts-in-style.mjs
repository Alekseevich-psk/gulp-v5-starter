"use strict";

import fs from "fs";
import path from "path";

import { paths } from "../config/config.mjs";

function cb() {}

function getStyleFont(fontName) {
    if (fontName.toLowerCase().indexOf("italic") > 0) return "Italic";
    return "Normal";
}

function getWeightFont(font) {
    const fontName = font.toLowerCase().replace("-", "");

    switch (true) {
        case fontName.indexOf("thin") > 0:
            return "100";

        case fontName.indexOf("extralight") > 0:
            return "200";

        case fontName.indexOf("ultralight") > 0:
            return "200";

        case fontName.indexOf("light") > 0:
            return "300";

        case fontName.indexOf("regular") > 0:
            return "400";

        case fontName.indexOf("medium") > 0:
            return "500";

        case fontName.indexOf("semibold") > 0:
            return "600";

        case fontName.indexOf("demi") > 0:
            return "600";

        case fontName.indexOf("bold") > 0:
            return "700";

        case fontName.indexOf("extrabold") > 0:
            return "800";

        case fontName.indexOf("ultrabold") > 0:
            return "800";

        case fontName.indexOf("black") > 0:
            return "900";

        case fontName.indexOf("heavy") > 0:
            return "900";

        default:
            return "400";
    }
}

function includeFont(fontName) {
    const nameArray = fontName.split("-");

    fs.appendFile(
        paths.styles.fonts,
        '@include font("' +
            nameArray[0] +
            '", "' +
            fontName +
            '", "' +
            getWeightFont(fontName) +
            '", "' +
            getStyleFont(fontName) +
            '");\r\n',
        cb
    );
}

const fontsInStyle = async () => {
    fs.truncate(paths.styles.fonts, 0, function () {
        console.log("fs.truncate - done");
    });

    fs.readdir(paths.fonts.srcFs, (err, files) => {
        files.forEach((file) => {
            if (path.extname(file).toLowerCase() === ".woff") {
                includeFont(file.split(".")?.[0]);
            }
        });

        if (err) console.log(err);
    });
};

export default fontsInStyle;
