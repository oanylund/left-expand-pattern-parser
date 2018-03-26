# left-expand-pattern-parser

## Usage

```javascript
import parser from "left-expand-pattern-parser";

parser("{a,b}(1-3)");
// { progress: "COMPLETE", missing_refs: [], list: [a1, a2, a3, b1, b2, b3] }
```

## Constants

```javascript
const REFERENCE = "REFERENCE";
const PARTIAL = "PARTIAL";
const COMPLETE = "COMPLETE";
const MISSING_REFERENCES = "MISSING_REFERENCES";
const ERROR = "ERROR";
```

## Interfaces

### Descriptor

```javascript
{
    progress: COMPLETE | MISSING_REFERENCES | ERROR,
    parse_error?: ParseError,
    missing_refs?: [MissingRef],
    list?: [String | ListItem]
}
```

```javascript
// typical COMPLETE Description object
{
    progress: COMPLETE,
    missing_refs: [],
    list: [String]
}

// typical MISSING_REFERENCES Description object
{
    progress: MISSING_REFERENCES,
    missing_refs: [MissingRef],
    list: [ListItem]
}

// typical Error Description object
{
    progress: ERROR,
    parse_error: ParseError
}
```

### ListItem

```javascript
ListItem = Partial | Reference
```

### Partial

```javascript
{
    type: PARTIAL,
    part: [String]
}
```

### Reference

```javascript
{
    type: REFERENCE,
    ref: String
}
```

### MissingRef

```javascript
{
    ref: String,
    idx: Number
}
```

### ParseError

```javascript
{
    message: String,
    location: {
        start: Number,
        end: Number
    }
}
```