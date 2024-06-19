"use strict";

import fs from "fs";
import path from "path";

import { paths } from "../config/config.mjs";
import ttf2woff from "ttf2woff";
import ttf2woff2 from "ttf2woff2";

const ttfToWoff = async () => {
    fs.readdir(paths.ttf2Woff.src, (err, files) => {
        files.forEach((file) => {
            if (path.extname(file).toLowerCase() === ".ttf") {
                const ttfBuffer = fs.readFileSync(paths.ttf2Woff.src + file);

                fs.writeFileSync(
                    paths.ttf2Woff.dist + file.replace(".ttf", ".woff"),
                    ttf2woff(ttfBuffer)
                );

                fs.writeFileSync(
                    paths.ttf2Woff.dist + file.replace(".ttf", ".woff2"),
                    ttf2woff2(file)
                );
            }
        });

        if (err) console.log(err);
    });
};

export default ttfToWoff;
