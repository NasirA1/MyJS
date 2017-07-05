#! /usr/bin/env node

'use strict'

var StringCalculator = require('../src/StringCalculator');

if(process.argv.length < 3)
{
  console.log("Usage: ./app.js {sequenceString}")
  console.log("Example: ./app.js 1,23,5,3")
  return 1;
}

var calc = new StringCalculator();
console.log(calc.add(process.argv[2]));

