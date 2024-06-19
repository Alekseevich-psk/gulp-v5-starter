"use strict";

import { hideBin } from "yargs/helpers";
import fs from "fs";
import path from "path";
import { paths, config } from "../config/config.mjs";

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
    fs.truncate(pathKey, 0, function () {
        console.log(`fs.truncate ${pathKey} - done`);
    });
};

const saveModeKey = (path, key, mode) => {
    fs.appendFile(path, `export const ${key} = ${mode};`, cb);
};

const activeMode = (
    pathApp,
    pathKeyMode,
    mode,
    nameKeyMode,
    valueKeyMode,
    typeRemoveFiles
) => {
    removeFiles(pathApp, `.${typeRemoveFiles}`);
    clearContentKeyFile(pathKeyMode);
    saveModeKey(pathKeyMode, nameKeyMode, valueKeyMode);
    successMessage(mode, typeRemoveFiles);
};

const switchMode = async () => {
    const keyMode = hideBin(process.argv)[1];

    switch (keyMode) {
        case "--pug":
            activeMode(paths.app, paths.keyPug, "pug", "keyPug", true, "html");
            break;

        case "--html":
            activeMode(paths.app, paths.keyPug, "html", "keyPug", false, "pug");
            break;

        case "--js":
            activeMode(paths.app, paths.keyTs, "js", "keyTs", false, "ts");
            break;

        case "--ts":
            activeMode(paths.app, paths.keyTs, "ts", "keyTs", true, "js");
            break;

        default:
            break;
    }
};

export default switchMode;
