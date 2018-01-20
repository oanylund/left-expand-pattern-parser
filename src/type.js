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
    list: []
}

    // completed Description object
    const completed = {
        progress: COMPLETE,
        list: [{}, {}, ...]
    }

    // needs filled references Description object
    const missing = {
        progress: MISSING_REFERENCES,
        missing_refs: ["ff", "ff"],
        list: [String]
    }