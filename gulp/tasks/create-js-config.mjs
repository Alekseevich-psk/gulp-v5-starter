"use strict";

import fs from "fs";

import { paths, jsConfig, config } from "../config/config.mjs";
import { deleteSync } from "del";

const createJsConfig = async () => {
    const file = config.onTs ? paths.tsConfig : paths.jsConfig;

    if (fs.existsSync(paths.jsConfig)) deleteSync(paths.jsConfig);
    if (fs.existsSync(paths.tsConfig)) deleteSync(paths.tsConfig);

    fs.writeFileSync(file, JSON.stringify(jsConfig), "utf8", (err) => {
        if (err) throw err;
        console.log("config - Done");
    });
};

export default createJsConfig;
