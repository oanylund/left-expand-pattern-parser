# left-expand-pattern-parser

Parses a string of patterns and returns an array of strings

## Usage

```javascript
import { parser, fillInReference } from "left-expand-pattern-parser";

parser("{a,b}(1-3)");
// { progress: "COMPLETE", missing_refs: [], list: ["a1", "a2", "a3", "b1", "b2", "b3"] }

const partialResultWithRef = parser("1%aRef%");
// {
//     progress: "MISSING_REFERENCES",
//     missing_refs: [{ ref: "aRef", idx: 1}],
//     list: [
//         { type: "PARTIAL", part: ["1"] },
//         { type: "REFERENCE", ref: "aRef" },
//     ]
// }

const refMap = {
    aRef: ["a"]
}

const filledWithRefs = fillInReferences(refMap, partialResultWithRef)
// {
//     progress: "COMPLETE",
//     missing_refs: [],
//     list: ["1a"]
// }
```

## Exported API

`parser(str: string) => Descriptor`

`fillInReferences(refMap: RefMap, descObj: Descriptor) => Descriptor`

`COMPLETE: string`

`MISSING_REFERENCES: string`

`ERROR: string`

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
// COMPLETE Descriptor object
{
    progress: COMPLETE,
    missing_refs: [],
    list: [String]
}

// MISSING_REFERENCES Descriptor object
{
    progress: MISSING_REFERENCES,
    missing_refs: [MissingRef],
    list: [ListItem]
}

// ERROR Descriptor object
{
    progress: ERROR,
    parse_error: ParseError
}
```

### RefMap

```javascript
{
    [refName: String]: [String],
    ...
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