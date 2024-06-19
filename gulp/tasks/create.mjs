"use strict";

import { hideBin } from "yargs/helpers";
import fs from "fs";
import { keyPug } from "../config/key-pug.mjs";

import { paths } from "../config/config.mjs";

const createFolder = (path, nameFolder) => {
    const dir = path + "/" + nameFolder.slice(2);

    fs.mkdir(dir, (err) => {
        if (err) return console.error(err);
        console.log("Directory created successfully!");
    });
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
                let fileContent = "";

                if (type === "scss") {
                    fileContent = `.${file} {}`;
                }

                fs.readFile(dir, "utf8", (error, data) => {
                    if (error && !data) {
                        return fs.writeFile(dir, fileContent, "utf8", (err) => {
                            if (err) throw err;
                        });
                    }

                    if (data || data === "")
                        return console.log(`Error: The ${file}.${type} already exists!`);
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
