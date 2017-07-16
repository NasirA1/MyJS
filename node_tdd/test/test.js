'use strict'

const chai = require('chai');
const assert = chai.assert; // we are using the 'assert' style of Chai
const http = require('http');
const app = require('../src/app.js')


function testRestRpc(options, expected) 
{
  return new Promise((resolve, reject) => {
    http.get(options, (res) => {
      var data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', err => { console.log(err); reject(err); });

  }).then(actual => actual == expected ?
    Promise.resolve() : Promise.reject(
      new Error('expected: ' + expected + ', actual: ' + actual)
    ));
}


describe('My Restful API', function () {

  it('adding 0 and 0 return 0', function () {
    let options = {
      host: 'localhost',
      path: '/add?x=0&y=0',
      port: 3000
    };

    return testRestRpc(options, 0);
  });

  it('adding 1 and 2 return 3', function () {
    let options = {
      host: 'localhost',
      path: '/add?x=1&y=2',
      port: 3000
    };

    return testRestRpc(options, 3);
  });


});
