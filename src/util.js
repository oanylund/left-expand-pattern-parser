const {
  REFERENCE,
  PARTIAL,
  COMPLETE,
  MISSING_REFERENCES
} = require("./constants");

const R = require("ramda");

const charToCharCode = R.invoker(1, "charCodeAt")(0);
const findMinMax = R.apply(R.juxt([Math.min, Math.max]));
const isType = R.propEq("type");
const isReference = isType(REFERENCE);
const hasReference = R.any(isReference);
const listLens = R.lensProp("list");
const getList = R.view(listLens);
const partLens = R.lensProp("part");
const getPart = R.view(partLens);
const zipWithIndex = R.addIndex(R.map)(R.pair);

const appender = (acc, val) =>
  R.compose(R.flatten, R.map(av => val.map(vv => av + vv)))(acc);

const buildList = tree => tree.reduce(appender);

exports.buildList = buildList;

const letterRange = (a, b) =>
  R.compose(
    R.map(charCode => String.fromCharCode(charCode)),
    R.apply(R.range),
    R.adjust(R.add(1), 1),
    findMinMax,
    R.map(charToCharCode)
  )([a, b]);

exports.letterRange = letterRange;

const integerRange = (a, b) =>
  R.compose(
    R.map(R.toString),
    R.apply(R.range),
    R.adjust(R.add(1), 1),
    findMinMax
  )([a, b]);

exports.integerRange = integerRange;

const takePos = R.curry((pos, arr) => arr.map(v => v[pos]));

exports.takePos = takePos;

const makeRefObj = ref => ({
  type: REFERENCE,
  ref
});

exports.makeRefObj = makeRefObj;

const makePartialObj = part => ({
  type: PARTIAL,
  part
});

exports.makePartialObj = makePartialObj;

const makeCompleteList = R.compose(buildList, R.map(getPart));

const makeMissingRefObj = R.applySpec({
  ref: R.compose(R.prop("ref"), R.head),
  idx: R.last
});

const findMissingRefs = R.into(
  [],
  R.compose(
    zipWithIndex,
    R.filter(R.pipe(R.head, isReference)),
    R.map(makeMissingRefObj)
  )
);

exports.findMissingRefs = findMissingRefs;

const completeOrReference = R.ifElse(
  R.__,
  R.always(MISSING_REFERENCES),
  R.always(COMPLETE)
);

const makeDescObj = R.applySpec({
  progress: completeOrReference(hasReference),
  missing_refs: findMissingRefs,
  list: R.unless(hasReference, makeCompleteList)
});

exports.makeDescObj = makeDescObj;
