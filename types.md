# Description-linker

parse(str) -> parser (by peg.js generated from grammar)
-> description object (can be three types)

### Constants
```javascript
const REFERENCE = "REFERENCE";
const PARTIAL = "PARTIAL";
const COMPLETE = "COMPLETE";
const MISSING_REFERENCES = "MISSING_REFERENCES";
```

### Partials from list received from parser
```javascript
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
```

### Description object
#### after going through transfrom it becomes
```javascript
const complete = {
    progress: String,
    missing_refs: [],
    list: []
}
```

```javascript
    // completed Description object
    const completed = {
        progress: COMPLETE,
        missing_refs: [],
        list: [String]
    }
```

```javascript
    // needs filled references Description object
    const missing = {
        progress: MISSING_REFERENCES,
        missing_refs: [{}:missing_refs_obj, {}:missing_refs_obj, ...],
        list: [{}, {}, ...]
    }
```

```javascript
    const missing_refs_obj = {
        ref: "fafea",
        idx: 1
    }
```
    