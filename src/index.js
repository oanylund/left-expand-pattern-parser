import { lensProp, map, compose, over, prop, pickAll } from "ramda";
import { parse } from "./generatedParser";
import { ERROR } from "./constants";

export { fillInReferences } from "./util";

const locationLens = lensProp("location");

const transformParsingError = compose(
  over(locationLens, map(prop("offset"))),
  pickAll(["message", "location"])
);

export const parser = str => {
  try {
    return parse(str);
  } catch (error) {
    return {
      progress: ERROR,
      parse_error: transformParsingError(error)
    };
  }
};
