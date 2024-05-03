"use strict";

import { paths } from "./config.mjs";
import { deleteAsync } from "del";

const clean = () => {
    return deleteAsync(paths.dist);
};

export default clean;
