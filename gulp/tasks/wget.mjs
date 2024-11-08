import scrape from "website-scraper";

import fs from "fs";
import { hideBin } from "yargs/helpers";
import { src, dest } from "gulp";
import { paths } from "../config/config.mjs";
import browsersync from "browser-sync";

export const wgetFiles = async () => {
    if (!fs.existsSync(paths.wget.src.replace("**/*", ""))) return;

    return src(paths.wget.src, { encoding: false })
        .pipe(dest(paths.wget.dist))
        .on("end", browsersync.reload);
};

export const wget = async () => {
    const pathToFolder = paths.wget.src.replace("**/*", "");
    const url = hideBin(process.argv)[1].slice(2);
    const options = {
        urls: [url],
        directory: pathToFolder,
        maxDepth: 1,
    };

    fs.rmSync(pathToFolder, { recursive: true, force: true });
    
    return scrape(options).then((result) => {
        console.log("wget - success!");
    });
};
