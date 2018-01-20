const PEG = require("pegjs");
const { readFileSync } = require("fs");
const { buildList } = require("./src/util");

const parser = PEG.generate(
    readFileSync(__dirname + "/grammar/grammar.1.pegjs", "utf8"),
    { optimize: "size" }
);

const parse = parser.parse;

const skuldWells = parse("{(71-74),(76-79),(81-84)}");
const sys19 = ["19"];

const list = buildList([sys19, skuldWells]);

console.log(skuldWells)


// console.log(
//     JSON.stringify(
//         parser.parse(
//             readFileSync(
//                 __dirname+"/test.txt", 
//                 "utf8"
//             )
//         )
//         , null, 2)
// );