"use strict";

import { hideBin } from "yargs/helpers";
import fs from "fs";
import path from "path";
import { paths, config } from "./config.mjs";

function cb() {}

function removeFiles(startPath, filter) {
    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    const files = fs.readdirSync(startPath);

    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);

        if (stat.isDirectory()) {
            removeFiles(filename, filter);
        } else if (filename.endsWith(filter)) {
            fs.unlinkSync(filename);
            console.log(filename);
        }
    }
}

const switchPug = async () => {
    let keyPug = true;

    if (hideBin(process.argv)[1] === "--pug") {
        removeFiles(paths.app, ".html");
    } else {
        removeFiles(paths.app, ".pug");
        keyPug = false;
    }

    fs.truncate(paths.keyPug, 0, function () {
        console.log("fs.truncate - done");
    });

    fs.appendFile(paths.keyPug, `export const keyPug = ${keyPug};`, cb);
};

export default switchPug;
