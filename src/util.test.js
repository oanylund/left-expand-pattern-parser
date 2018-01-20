const { buildList } = require("./util");

describe("buildList", () => {
    it("should flatten list", () => {
        const tree = [ 
            ["18"], 
            ["PT", "XT"] 
        ];

        expect(buildList(tree)).toEqual(["18PT", "18XT"])

    })

});