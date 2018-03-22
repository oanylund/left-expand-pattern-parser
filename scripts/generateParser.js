const peg = require("pegjs");
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const grammarPath = join(__dirname, "../grammar/grammarWithRefs.pegjs");
const parserPath = join(__dirname, "../src/generatedParser.js");

const grammar = readFileSync(grammarPath, { encoding: "utf8" });

const header = `import * as utils from "./util";`;

const parserSource = peg.generate(grammar, {
  output: "source",
  format: "es",
  header
});

writeFileSync(parserPath, parserSource);
