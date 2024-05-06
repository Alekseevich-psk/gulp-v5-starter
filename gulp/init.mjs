"use strict";

import { hideBin } from "yargs/helpers";

import fs from "fs";
import path from "path";

import { src, dest } from "gulp";
import { paths, config } from "./config.mjs";

function fromDir(startPath, filter) {
    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    const files = fs.readdirSync(startPath);

    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);

        if (stat.isDirectory()) {
            fromDir(filename, filter);
        } else if (filename.endsWith(filter)) {
            fs.unlinkSync(filename);
        }
    }
}

const init = async () => {
    config.onPug ? fromDir(paths.app, ".html") : fromDir(paths.app, ".pug");
};

export default init;
