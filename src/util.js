const R = require("ramda");

const appender = (acc, val) => R.compose(
        R.flatten,
        R.map(av => val.map(vv => av + vv))
    )(acc);

const buildList = tree => tree.reduce(appender);

exports.buildList = buildList;

const charToCharCode = R.invoker(1, 'charCodeAt')(0);
const findMinMax = R.apply(R.juxt([Math.min, Math.max]));

const letterRange = (a, b) => R.compose(
    R.map(charCode => String.fromCharCode(charCode)),
    R.apply(R.range),
    R.adjust(R.add(1), 1),
    findMinMax,
    R.map(charToCharCode)
)([a,b]);

exports.letterRange = letterRange;

const integerRange = (a,b) => R.compose(
    R.map(R.toString),
    R.apply(R.range),
    R.adjust(R.add(1), 1),
    findMinMax
)([a,b]);

exports.integerRange = integerRange;

const takePos = R.curry((pos, arr) => arr.map(v => v[pos]));

exports.takePos = takePos;

const makeRefObj = (ref) => ({
    type: "REFERENCE",
    ref
});

exports.makeRefObj = makeRefObj;

const makePartialObj = (list) => ({
    type: "PARTIAL",
    list
});

exports.makePartialObj = makePartialObj;

const isType = R.propEq("type");
const listLens = R.lensProp("list");
const getList = R.view(listLens);

const makeCompleteList = R.compose(
    buildList,
    R.map(getList)
);

//Sideffect
const partialRef = (descObj, ref) => {
    R.compose(
        
        R.tap(R.
    );
}

const makeDescObj = R.cond([
    [R.any(isType("REFERENCE")), R.identity],
    [R.T, makeCompleteList]
]);


const takeWhileWIthIndex = R.addIndex(R.takeWhile);

const a = (list) => {

    const DescriptionInitial = {
        progress: null,
    }

    
    
}