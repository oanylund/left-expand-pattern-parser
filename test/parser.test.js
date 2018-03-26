import { parser, fillInReferences } from "../src";

describe("parser", () => {
  it("should return expected ranges", () => {
    const parseIntegerRangeResult = parser("(1-3)");
    expect(parseIntegerRangeResult).toMatchSnapshot();

    const parseZeroPadddedIntegerRangeResult = parser("(^3^1-3)");
    expect(parseZeroPadddedIntegerRangeResult).toMatchSnapshot();

    const parseLetterRangeResult = parser("(a-c)");
    expect(parseLetterRangeResult).toMatchSnapshot();
  });

  it("should branch correctly", () => {
    const parseSimpleBranchResult = parser("{(1-2),3}a");
    expect(parseSimpleBranchResult).toMatchSnapshot();
  });

  it("should return error message when illegal characters", () => {
    const parseError = parser("#{(1-2),3}a");
    expect(parseError).toMatchSnapshot();
  });

  it("should return partial array when refs are used", () => {
    const parseRef = parser("(1-2)%ref%b");
    expect(parseRef).toMatchSnapshot();
  });

  it("should return partial array, and be like expected on fill in", () => {
    const parseRef = parser("1%aRef%");
    expect(parseRef).toMatchSnapshot();

    const refMap = {
      aRef: ["a"]
    };

    expect(fillInReferences(refMap, parseRef)).toMatchSnapshot();
  });
});
