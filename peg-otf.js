const PEG = require("pegjs");
const { readFileSync } = require("fs");
const parse = require('./src/parse');

const prettyPrint = print => console.log(JSON.stringify(print, null, 2));

// const parser = PEG.generate(
//   readFileSync(__dirname + "/grammar/grammarWithRefs.pegjs", "utf8"),
//   { optimize: "size" }
// );

// const parse = parser.parse;

const testP = parse("{(71-74),(76-79),(81-84)}");

prettyPrint(testP);

