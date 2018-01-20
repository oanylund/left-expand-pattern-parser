# Descriptor-linker

## Usage
parse(str) -> Either SyntaxError Descriptor

## Constants
```javascript
const REFERENCE = "REFERENCE";
const PARTIAL = "PARTIAL";
const COMPLETE = "COMPLETE";
const MISSING_REFERENCES = "MISSING_REFERENCES";
```
## Types

### Descriptor
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




### Sub types 

Items of list array. The list array is a member of the Descriptor type.
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

missing_refs type. Member of the Descriptor type.
```javascript
const missing_refs_obj = {
    ref: "fafea",
    idx: 1
}
```
    