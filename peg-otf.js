const PEG = require("pegjs");
const { readFileSync } = require("fs");

const parser = PEG.generate(
    readFileSync(__dirname + "/grammar/grammar.pegjs", "utf8"),
    { optimize: "size" }
);

console.log(parser.parse("18PT(1-3)122A"));