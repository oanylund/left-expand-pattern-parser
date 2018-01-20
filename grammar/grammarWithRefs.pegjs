{
  const R = require("ramda")
  const { join } = require("path")
  const { 
    buildList,
    letterRange,
    integerRange,
    takePos,
    makeRefObj,
    makePartialObj,
    makeDescObj
  } = require(join(process.cwd(), "src", "util"))
  const charArrToString = R.join("")
}

Descriptor
  = _ parts:Part+ _ { return makeDescObj(parts) }

Part
  = Partial / ExternalReferance

Partial
  = partial:(Expression / Enum / ArrWrappedStaticText) { 
      return makePartialObj(partial)
    }

ExternalReferance "reference"
  = "%" ref:[a-zA-Z0-9]+ "%" { return R.compose(makeRefObj, charArrToString)(ref) }

Expression "expression"
  = "(" et:ExType+ ")" { return buildList(et) }

ExType
  = Range / Enum / FreeText

Enum "enum"
  = "{" e:(EnumType ","?)+ "}" { 
    return R.compose(R.flatten, R.map(R.head))(e)
  }
  
EnumType
  = StaticText / Expression

Range "range"
  = r:(LetterRange / IntegerRange / ZeroPaddedIntegerRange) { return r }

LetterRange "letter range"
  = head:Letter "-" tail:Letter { return letterRange(head, tail) }

ZeroPaddedIntegerRange "zero padding"
  = "^" zeroes:Integer "^" range:IntegerRange {
    return range.map(intStr => intStr.padStart(zeroes, "0") )
  }

IntegerRange "integer range"
  = head:Integer "-" tail:Integer { return integerRange(head, tail) }
  
FreeText "free text"
  = "\"" ft:[a-zA-Z0-9-\/]+ "\"" { return [charArrToString(ft)] }

ArrWrappedStaticText
  = st:StaticText { return [st] }

StaticText "static text"
  = st:[a-zA-Z0-9-_]+ { return charArrToString(st) }

Letter "letter"
  = l:[a-zA-Z] { return l.toUpperCase() }

Integer "integer"
  = i:[0-9]+ { return +charArrToString(i) }

_ "whitespace"
  = [ \t\n\r]*