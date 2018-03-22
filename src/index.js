import { lensProp, map, compose, over, prop, pickAll } from "ramda";
import { parse } from "./generatedParser";
import { ERROR } from "./constants";

const locationLens = lensProp("location");

const transformParsingError = compose(
  over(locationLens, map(prop("offset"))),
  pickAll(["message", "location"])
);

const safeParse = str => {
  try {
    return parse(str);
  } catch (error) {
    return {
      progress: ERROR,
      parse_error: transformParsingError(error)
    };
  }
};

export default safeParse;
