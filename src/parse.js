const { lensProp, compose, over, map, prop, pickAll } = require("ramda");
const { Left, Right } = require("sanctuary");
const { parse } = require("./generatedParser");

const locationLens = lensProp("location");

const transformParsingError = compose(
  over(locationLens, map(prop("offset"))),
  pickAll(["message", "location"])
);

const safeParse = str => {
  try {
    return Right(parse(str));
  } catch (error) {
    return Left(transformParsingError(error));
  }
};

module.exports = safeParse;
