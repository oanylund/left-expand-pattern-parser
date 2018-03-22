import { lensProp, compose, over, map, prop, pickAll } from "ramda";
import { Left, Right } from "sanctuary";
import { parse } from "./generatedParser";

const locationLens = lensProp("location");

const transformParsingError = compose(
  over(locationLens, map(prop("offset"))),
  pickAll(["message", "location"])
);

export const safeParse = str => {
  try {
    return Right(parse(str));
  } catch (error) {
    return Left(transformParsingError(error));
  }
};
