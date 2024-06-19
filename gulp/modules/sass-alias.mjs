"use strict";

import through from "through2";
import PluginError from "plugin-error";
import { alias } from "../config/config.mjs";

const sassAlias = () => {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit(
                "error",
                new PluginError("module-sass-alias", "Streaming not supported")
            );
            return cb();
        }

        try {
            let content = file.contents.toString();

            for (const [key, value] of Object.entries(alias.scss)) {
                content = content.replaceAll(key, value);
            }

            file.contents = Buffer.from(content, "utf8");
        } catch (err) {
            this.emit("error", new PluginError("module-sass-alias", err));
        }

        this.push(file);
        cb();
    });
};

export default sassAlias;
