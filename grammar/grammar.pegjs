{
  const { 
    buildList,
    letterRange,
    integerRange,
    takePos,
    compose,
    flatten,
    map,
    head 
  } = utils
}

Descriptors
  = descs:(_ Descriptor+ _)* { 
    return compose(flatten, takePos(1))(descs);
  }

Descriptor
  = _ parts:Partial+ _ { return buildList(parts); }

Partial
  = Expression / Enum / ArrWrappedStaticText

Expression
  = "(" et:ExType+ ")" { return buildList(et); }

ExType
  = Range / Enum / FreeText

Enum
  = "{" e:(EnumType ","?)+ "}" { 
    return compose(flatten, map(head))(e);
  }
  
EnumType
  = StaticText / Expression

Range
  = r:(LetterRange / IntegerRange / ZeroPaddedIntegerRange) { return r; }

LetterRange
  = head:Letter "-" tail:Letter { return letterRange(head, tail); }

ZeroPaddedIntegerRange
  = "^" zeroes:Integer "^" range:IntegerRange {
    return range.map(intStr => intStr.padStart(zeroes, "0"); )
  }

IntegerRange
  = head:Integer "-" tail:Integer { return integerRange(head, tail); }
  
FreeText
  = "\"" ft:[a-zA-Z0-9-\/]+ "\"" { return [ft.join("")]; }

ArrWrappedStaticText
  = st:StaticText { return [st]; }

StaticText
  = st:[a-zA-Z0-9-_]+ { return st.join(""); }

Letter
  = l:[a-zA-Z] { return l.toUpperCase(); }

Integer
  = i:[0-9]+ { return +i.join(""); }

_ "whitespace"
  = [ \t\n\r]*