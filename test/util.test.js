const { buildList, findMissingRefs, makeDescObj } = require("./util");
const {
  REFERENCE,
  PARTIAL,
  COMPLETE,
  MISSING_REFERENCES
} = require("./constants");

describe("buildList", () => {
  it("should flatten list", () => {
    const tree = [["18"], ["PT", "XT"]];

    expect(buildList(tree)).toEqual(["18PT", "18XT"]);
  });
});

describe("findMissingRefs", () => {
  it("should return list of missing_refs with indexes", () => {
    const list = [
      {
        type: PARTIAL,
        part: ["A", "B"]
      },
      {
        type: REFERENCE,
        ref: "A"
      },
      {
        type: PARTIAL,
        part: ["1", "2"]
      },
      {
        type: REFERENCE,
        ref: "B"
      },
      {
        type: PARTIAL,
        part: ["3", "4"]
      },
      {
        type: REFERENCE,
        ref: "C"
      },
      {
        type: PARTIAL,
        part: ["C"]
      }
    ];

    const correctResult = [
      {
        ref: "A",
        idx: 1
      },
      {
        ref: "B",
        idx: 3
      },
      {
        ref: "C",
        idx: 5
      }
    ];

    expect(findMissingRefs(list)).toEqual(correctResult);
  });

  it("should return empty missing_refs when no references in list", () => {
    const list = [
      {
        type: PARTIAL,
        part: ["3", "4"]
      },
      {
        type: PARTIAL,
        part: ["C"]
      }
    ];

    expect(findMissingRefs(list)).toEqual([]);
  });
});

describe("makeDescObj", () => {
  it("should complete list that contains only partials", () => {
    const list = [
      {
        type: PARTIAL,
        part: ["3", "4"]
      },
      {
        type: PARTIAL,
        part: ["C"]
      }
    ];
    const correctResult = {
      progress: COMPLETE,
      missing_refs: [],
      list: ["3C", "4C"]
    };

    expect(makeDescObj(list)).toEqual(correctResult);
  });

  it("should return missing_refs with as-is list and missing_res array", () => {
    const list = [
      {
        type: PARTIAL,
        part: ["A", "B"]
      },
      {
        type: REFERENCE,
        ref: "A"
      },
      {
        type: PARTIAL,
        part: ["1", "2"]
      }
    ];

    const correctResult = {
      progress: MISSING_REFERENCES,
      missing_refs: [{ ref: "A", idx: 1 }],
      list: list
    };

    expect(makeDescObj(list)).toEqual(correctResult);
  });
});
