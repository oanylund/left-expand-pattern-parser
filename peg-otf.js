const parser = require("./dist/left-expand-pattern-parser.cjs");

const prettyPrint = print => console.log(JSON.stringify(print, null, 2));

const parsedOut = parser("{¤(71-74),(76-79),(81-84)}");

prettyPrint(parsedOut);
