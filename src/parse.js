const R = require("ramda");
const { Left, Right, I } = require("sanctuary");
const { parse } = require("./generatedParser");

const locationLens = R.lensProp("location");

const transformParsingError = R.compose(
  R.over(locationLens, R.map(R.prop("offset"))),
  R.pickAll(["message", "location"])
);

const safeParse = str => {
  try {
    return Right(parse(str));
  } catch (error) {
    return Left(transformParsingError(error));
  }
};

module.exports = safeParse;
