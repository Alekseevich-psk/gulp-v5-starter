export default function removeInnerBraces(str) {
    while (str.includes("{") && str.includes("}")) {
        const start = str.lastIndexOf("{");
        const end = str.indexOf("}", start);
        if (start === -1 || end === -1) break;
        str = str.slice(0, start) + str.slice(end + 1);
    }
    str = str.replace("**/*", "").replace("*", "").replace(".", "");
    return str;
}
