#! /usr/bin/env node

'use strict'



function sum(nums) {
  var total = 0;
  for(let i = 0; i < nums.length; i++) {
    const n = parseInt(nums[i]);
    if(n < 0)
      throw new RangeError("negatives not allowed");
    else if(n > 1000)
      continue;
    else if(!isNaN(n))
      total += n;
  }
  return total;
}


function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}


function extractDelimiters(delimiterString) {
  if(delimiterString.startsWith("[") && delimiterString.endsWith("]"))
  {
    var delims = delimiterString.split(/\s*\[\s*|\s*\]\s*/);
    delims = delims.filter( (s) => { return s != "";} );

    for(let i = 0; i < delims.length; i++)
      delims[i] = escapeRegExp(delims[i]);

    return delims;
  }
  
  return [ delimiterString ];
}


function slice(sequenceString) {
    var delims = [","];  //initialise to default

    if(sequenceString.startsWith("//")) {
      var newLinePos = sequenceString.indexOf("\n");
      delims = extractDelimiters(sequenceString.substr(2, newLinePos - 2));
      sequenceString = sequenceString.substr(newLinePos + 1);
    }

    return { head: delims, tail: sequenceString };
}


function tokenise(sequenceString, delims) {
  var pattern = "\s*\n\s*";
  for(var i = 0; i < delims.length; i++)
    pattern += "|\s*" + delims[i] + "\s*";

  return sequenceString.split(new RegExp(pattern));
}


module.exports = class StringCalculator {
  constructor() {
  }

  add(sequenceString) {
    if(sequenceString == "")
      return 0;
    
    const result = slice(sequenceString);
    const nums = tokenise(result.tail, result.head);
    const total = sum(nums);

    return total;
  }
}
