@{%
  const R = require("ramda");

  const appender = (acc, val) => R.compose(
        R.flatten,
        R.map(av => val.map(vv => av + vv))
    )(acc);

  const flatten = buildList

  const isString = obj => typeof obj === "string"
  
  const concat = arr => arr.reduce( (acc,val) => acc.concat(val))
  
  const rangeCreator = (head, tail) => {
    if(isString(head)) {
      const largest = Math.max(head.charCodeAt(0),tail.charCodeAt(0));
      const smallest = Math.min(head.charCodeAt(0),tail.charCodeAt(0));
    
      const range = [];
    
      for(let i = smallest; i <= largest; i++) {
        range.push(String.fromCharCode(i));
      }
    
      return range;
    }
    
    const largest = Math.max(head,tail);
    const smallest = Math.min(head,tail);
    
    const range = [];
    
    for(let i = smallest; i <= largest; i++) {
      range.push(i.toString());
    }
    
    return range;
  
  }
  
  const takePos = (pos, arr) => arr.map(v => v[pos])
%}

Descriptor
  ->  _ Partial+ _ {% d => flatten(d[1]) %}

Partial
  ->  Expression / Enum / ArrWrappedStaticText

Expression
  ->  "(" et:ExType+ ")" {% return flatten(et) %}

ExType
  ->  Range / Enum / FreeText

Enum
  ->  "{" e:(EnumType ","?)+ "}" {% 
    return R.compose(
      R.flatten,
      R.map(R.head)
    )(e)
  %}
  
EnumType
  ->  StaticText / Expression

Range
  ->  r:(LetterRange / IntegerRange) {% return r %}

LetterRange
  ->  head:Letter "-" tail:Letter {% return rangeCreator(head, tail) %}

IntegerRange
  ->  head:Integer "-" tail:Integer {% return rangeCreator(head, tail) %}
  
FreeText
  ->  "\"" ft:[a-zA-Z0-9-\/]+ "\"" {% return [ft.join("")] %}

ArrWrappedStaticText
  ->  StaticText {% d => d %}

StaticText
  ->  [a-zA-Z0-9-_]:+ {% ([s]) => s.join("") %}

Letter
  ->  [a-zA-Z] {% ([l]) l.toUpperCase() %}

Integer
  ->  [0-9]:+ {% ([i]) => +i.join("") %}
            
_ 
  ->  [ \t\n\r]:* {% nuller %}