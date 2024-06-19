import browsersync from "browser-sync";
import { paths } from "../config/config.mjs";

const browserSync = () => {
    browsersync.init({
        server: {
            baseDir: paths.dist,
        },
        inline: false,
        hot: true,
        port: 3000,
        notify: false,
    });
}

export default browserSync;