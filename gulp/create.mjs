"use strict";

import { hideBin } from "yargs/helpers";
import fs from "fs";
import path from "path";
import { keyPug } from "./key-pug.mjs";

import { paths } from "./config.mjs";

const createFolder = (path, nameFolder) => {
    fs.mkdir(path + "/" + nameFolder.slice(2), (err) => {
        if (err) return console.error(err);
        console.log("Directory created successfully!");
    });
    return true;
};

const createFiles = (path, nameFile, modeJs = null) => {
    const file = nameFile.slice(2);
    const pathFolder = `${path}/${file}`;
    const arrayTypeFiles = ["scss"];
    keyPug ? arrayTypeFiles.push("pug") : arrayTypeFiles.push("html");

    if ((modeJs !== null && modeJs === "--js") || modeJs === "--ts") {
        arrayTypeFiles.push(modeJs.slice(2));
    }

    try {
        const exists = fs.existsSync(pathFolder);

        if (exists) {
            arrayTypeFiles.forEach((type) => {
                const dir = `${path}/${file}/${type === "scss" ? "_" : ""}${file}.${type}`;
                console.log(dir);

                fs.writeFile(dir, "", "utf8", (err) => {
                    if (err) throw err;
                });
            });
        } else {
            console.log(`the ${pathFolder} folder does not exist`);
        }
    } catch (e) {
        console.log(e);
    }
};

const create = async () => {
    const type = hideBin(process.argv)[1];
    const name = hideBin(process.argv)[2];
    const modeJs = hideBin(process.argv)[3];

    let path = null;

    switch (type) {
        case "--component":
            path = paths.components;
            break;

        case "--element":
            path = paths.elements;
            break;

        case "--section":
            path = paths.sections;
            break;

        default:
            break;
    }

    if (path !== null) {
        createFolder(path, name);
        createFiles(path, name, modeJs);
    }
};

export default create;
