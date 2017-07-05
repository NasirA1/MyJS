#! /usr/bin/env node

'use strict'


const chai = require('chai');
const assert = chai.assert; // we are using the "assert" style of Chai
const StringCalculator = require('../src/StringCalculator');



describe('StringCalculator', function () {

  it('Constructor creates StringCalculator object', function () {
    var calc = new StringCalculator();
    assert.isNotNull(calc);
  });


  it('add(s) on empty string returns 0', function () {
    var calc = new StringCalculator();
    assert.equal(0, calc.add(""));
  });


  it('add(s) on string containing single number returns that number', function () {
    var calc = new StringCalculator();
    assert.equal(calc.add("0"), 0);
    assert.equal(calc.add("1"), 1);
  });


  it('add(s) on string containing two numbers returns the sum', function () {
    var calc = new StringCalculator();
    assert.equal(calc.add("1,2"), 3);
  });


  it('add(s) on string containing a sequence returns the sum', function () {
    var calc = new StringCalculator();
    assert.equal(calc.add("5,8,1"), 14);
  });


  it('add(s) on string sequence saparated by newline returns the sum', function () {
    var calc = new StringCalculator();
    assert.equal(calc.add("1\n5\n2"), 8);
  });


  it('add(s) on string sequence saparated by newline or comma returns the sum', function () {
    var calc = new StringCalculator();
    assert.equal(calc.add("1,5\n2\n3,4,2"), 17);
  });


  it('add(s) ignores empty tokens', function () {
    var calc = new StringCalculator();
    assert.equal(calc.add(",,1,\n5,,\n\n,2\n"), 8);
  });


  it('add(s) ignores whitespace', function () {
    var calc = new StringCalculator();
    assert.equal(calc.add("   1  , 2     , 3     "), 6);
  });


  it('add(s) supports different delimiters', function () {
    var calc = new StringCalculator();
    assert.equal(calc.add("//;\n1;2"), 3);
  });


  it('add(s) supports different delimiters(2)', function () {
    var calc = new StringCalculator();
    assert.equal(calc.add("//;\n\n1;\n2;3;4;5"), 15);
  });


  it('add(s) negative numbers throws exception', function () {
    var calc = new StringCalculator();
    assert.throws(() => calc.add("2,-1"), RangeError, "negatives not allowed");
  });


  it('add(s) numbers bigger than 1000 are ignored', function () {
    var calc = new StringCalculator();
    assert.equal(calc.add("2,1001"), 2);
  });


  it('add(s) supports delimiters of any length', function () {
    var calc = new StringCalculator();
    assert.equal(calc.add("//[***]\n1***2***3"), 6);
  });


  it('add(s) supports multiple delimiters', function () {
    var calc = new StringCalculator();
    assert.equal(calc.add("//[*][%]\n1*2%3"), 6);
  });


  it('add(s) supports multiple delimiters longer than a character', function () {
    var calc = new StringCalculator();
    assert.equal(calc.add("//[**][%%%]\n1**2%%%3"), 6);
  });

});
