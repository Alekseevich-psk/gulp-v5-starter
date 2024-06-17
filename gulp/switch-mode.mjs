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

const successMessage = (mode, typeFiles) => {
    return console.log(
        `${mode} mode - ON. All .${typeFiles} files have been successfully deleted!`
    );
};

const clearContentKeyFile = (pathKey) => {
    fs.truncate(paths.keyPug, 0, function () {
        console.log(`fs.truncate ${pathKey} - done`);
    });
};

const saveModeKey = (path, mode) => {
    fs.appendFile(path, `export const keyPug = ${mode};`, cb);
};

const saveMode = (pathApp, pathKeyMode, mode, keyMode, typeRemoveFiles) => {
    removeFiles(pathApp, `.${typeRemoveFiles}`);
    successMessage(mode, typeRemoveFiles);
    clearContentKeyFile(pathKeyMode);
    saveModeKey(pathKeyMode, keyMode);
};

const switchMode = async () => {
    const keyMode = hideBin(process.argv)[1];

    switch (keyMode) {
        case "--pug":
            saveMode(paths.app, paths.keyPug, "pug", true, "html");
            break;

        case "--html":
            saveMode(paths.app, paths.keyPug, "html", false, "pug");
            break;

        case "--js":
            saveMode(paths.app, paths.keyTs, "js", false, "ts");
            break;

        case "--ts":
            saveMode(paths.app, paths.keyTs, "ts", true, "js");
            break;

        default:
            break;
    }
};

export default switchMode;
