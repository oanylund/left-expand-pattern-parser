{
  const isString = obj => typeof obj === "string"
  
  const concat = (arr) => arr.reduce( (acc,val) => acc.concat(val))
  
  const flatten = (arr) => {
    const length = arr.length;
    const first = arr.shift()
    const head = isString(first) ? [first] : first

    if(length == 1) return head

    return arr.reduce( (acc, val, i, arr) => {
      if(isString(val)) {
        return acc.map(l => l + val)
      }
      
      return acc
        .map(l => val.map(v => l+v))
        .reduce( (ac,v) => ac.concat(v))
      
    }, head)
  }
  
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
  
  const takePosNjoin = (arr,pos) => arr.map(v => v[pos].join(""))
}

Descriptor
  = parts:(_ Partial+ _)* { return concat(parts.map(p => flatten(p[1]))) }
  
Partial
  = Expression / Enum / StaticText

Expression
  = "(" et:ExType+ ")" { return flatten(et) }

ExType
  = Range / Enum / FreeText

Enum
  = "{" e:(EnumType+ ","?)+ "}" { return takePosNjoin(e,0) }
  
EnumType
  = StaticText / Expression

Range
  = r:(LetterRange / IntegerRange) { return r }

LetterRange
  = head:Letter "-" tail:Letter { return rangeCreator(head, tail) }

IntegerRange
  = head:Integer "-" tail:Integer { return rangeCreator(head, tail) }
  
FreeText
  = "\"" ft:[a-zA-Z0-9-\/]+ "\"" { return ft.join("") }

StaticText
  = st:[a-zA-Z0-9-_]+ { return st.join("") }

Letter
  = l:[a-zA-Z] { return l.toUpperCase() }

Integer
  = i:[0-9]+ { return +i.join("") }

_ "whitespace"
  = [ \t\n\r]*