import nodeWget from "node-wget-js";

import fs from "fs";
import { hideBin } from "yargs/helpers";
import { paths } from "../config/config.mjs";

const wget = async () => {
    const pathToFolder = paths.wget.src.replace("**/*", "");
    const nameIndexFile = "index.html";
    const url = hideBin(process.argv)[1].slice(2);

    fs.rmSync(pathToFolder, { recursive: true, force: true });

    fs.mkdirSync(pathToFolder, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Новая директория: ${pathToFolder} - создана успешно!`);
        }
    });

    fs.writeFile(pathToFolder + nameIndexFile, "", "utf8", (err) => {
        if (err) throw err;
    });

    nodeWget(
        {
            url: url,
            dest: pathToFolder + nameIndexFile,
        },
        function (error, response, body) {
            if (error) {
                console.log("--- error:");
                console.log(error);
            } else {
                const insertAfter = (str, keyword, insert) => {
                    const index = str.indexOf(keyword);
                    if (index !== -1) {
                        return (
                            str.substring(0, index + keyword.length) +
                            insert +
                            str.substring(index + keyword.length)
                        );
                    }

                    return str;
                };

                const newContent = insertAfter(
                    body,
                    "<head>",
                    `<base href="${url}"/>`
                );

                fs.readFile(pathToFolder + nameIndexFile, (err, html) => {
                    if (err) throw err;
                });

                fs.writeFile(pathToFolder + nameIndexFile, newContent, (err) => {
                    if (err) throw err;
                    console.log("Файл успешно записан.");
                });
            }
        }
    );
};

export default wget;
