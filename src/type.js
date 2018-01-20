// Constants
const REFERENCE = "REFERENCE";
const PARTIAL = "PARTIAL";

const COMPLETE = "COMPLETE";
const MISSING_REFERENCES = "MISSING_REFERENCES";

// Reference object
const reference = {
    type: REFERENCE,
    ref: String
}

// Partial object
const partial = {
    type: PARTIAL,
    part: [String]
}

// ----------------------------------------------

// Description object
const complete = {
    progress: String,
    missing_refs: [],
    list: []
}

    // completed Description object
    const completed = {
        progress: COMPLETE,
        missing_refs: [],
        list: [String]
    }

    // needs filled references Description object
    const missing = {
        progress: MISSING_REFERENCES,
        missing_refs: [{}:missing_refs_obj, {}:missing_refs_obj, ...],
        list: [{}, {}, ...]
    }

    const missing_refs_obj = {
        ref: "fafea",
        idx: 1
    }