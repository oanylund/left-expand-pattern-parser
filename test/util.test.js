import {
  buildList,
  findMissingRefs,
  makeDescObj,
  getDescObjRefNames,
  getDescObjIndexesForRef,
  swapRefWithPart,
  fillInReferences
} from "../src/util";
import {
  REFERENCE,
  PARTIAL,
  COMPLETE,
  MISSING_REFERENCES
} from "../src/constants";

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

describe("getDescObjRefNames", () => {
  it("should return list of missing ref names", () => {
    const descObj = {
      missing_refs: [{ ref: "A", idx: 1 }, { ref: "B", idx: 2 }]
    };
    const correctResult = ["A", "B"];

    expect(getDescObjRefNames(descObj)).toEqual(correctResult);
  });
});

describe("getDescObjIndexesForRef", () => {
  it("should return list indexes for ref", () => {
    const descObj = {
      missing_refs: [
        { ref: "A", idx: 1 },
        { ref: "B", idx: 2 },
        { ref: "B", idx: 3 }
      ]
    };
    const correctResultA = [1];
    const correctResultB = [2, 3];

    const getIndexesForRef = getDescObjIndexesForRef(descObj);

    expect(getIndexesForRef("A")).toEqual(correctResultA);
    expect(getIndexesForRef("B")).toEqual(correctResultB);
  });

  it("should return empty array if ref not found", () => {
    const descObj = {
      missing_refs: [
        { ref: "A", idx: 1 },
        { ref: "B", idx: 2 },
        { ref: "B", idx: 3 }
      ]
    };

    const getIndexesForRef = getDescObjIndexesForRef(descObj);

    expect(getIndexesForRef("C")).toEqual([]);
  });
});

describe("swapRefWithPart", () => {
  it("should swap ref in partial list with part data", () => {
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

    const correctResult = [
      {
        type: PARTIAL,
        part: ["A", "B"]
      },
      {
        type: PARTIAL,
        part: ["a"]
      },
      {
        type: PARTIAL,
        part: ["1", "2"]
      }
    ];

    expect(swapRefWithPart(["a"], 1)(list)).toEqual(correctResult);
  });
});

describe("fillInReferences", () => {
  it("should swap ref in descObj with partial data, and remake to complete", () => {
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

    const descObj = {
      progress: MISSING_REFERENCES,
      missing_refs: [{ ref: "A", idx: 1 }],
      list: list
    };

    const refMap = {
      A: ["a"],
      C: ["c"]
    };

    const correctResult = {
      progress: COMPLETE,
      missing_refs: [],
      list: ["Aa1", "Aa2", "Ba1", "Ba2"]
    };

    expect(fillInReferences(refMap, descObj)).toEqual(correctResult);
  });

  it("should swap refs found and return another missing_refs", () => {
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
      }
    ];

    const descObj = {
      progress: MISSING_REFERENCES,
      missing_refs: [{ ref: "A", idx: 1 }, { ref: "B", idx: 3 }],
      list: list
    };

    const refMap = {
      A: ["a"],
      C: ["c"]
    };

    const correctResult = {
      progress: MISSING_REFERENCES,
      missing_refs: [{ ref: "B", idx: 3 }],
      list: [
        {
          type: PARTIAL,
          part: ["A", "B"]
        },
        {
          type: PARTIAL,
          part: ["a"]
        },
        {
          type: PARTIAL,
          part: ["1", "2"]
        },
        {
          type: REFERENCE,
          ref: "B"
        }
      ]
    };

    expect(fillInReferences(refMap, descObj)).toEqual(correctResult);
  });
});
