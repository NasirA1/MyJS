'use strict'

const chai = require('chai');
const assert = chai.assert; // we are using the 'assert' style of Chai
const http = require('http');
const sinon = require('sinon');

//the test subject
const app = require('../src/app.js')



///////////////////////////////////////////// Whitebox Unit Tests /////////////////////////////////////////////////


describe('My Restful API - Whitebox (Unit) Tests', function () {

  it('adding 0 and 0 returns 0', function () {
    var mockReq = sinon.mock( {
        query: { x: 0, y: 0 }
    });

    var mockResp = sinon.mock( {
      send: function(msg) {}
    });

    mockResp.expects('send').withArgs('0');
    app.handleGet(mockReq.object, mockResp.object);
  });



  it('adding 1 and 2 returns 3', function () {
    var mockReq = sinon.mock( {
        query: { x: 1, y: 2 }
    });

    var mockResp = sinon.mock( {
      send: function(msg) {}
    });

    mockResp.expects('send').withArgs('3');
    app.handleGet(mockReq.object, mockResp.object);
  });

});




///////////////////////////////////////////// Blackbox Integration Tests /////////////////////////////////////////////////

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




describe('My Restful API - Blackbox (Integration) Tests', function () {

  it('adding 0 and 0 returns 0', function () {
    let options = {
      host: 'localhost',
      path: '/add?x=0&y=0',
      port: 3000
    };

    return testRestRpc(options, 0);
  });


  it('adding 1 and 2 returns 3', function () {
    let options = {
      host: 'localhost',
      path: '/add?x=1&y=2',
      port: 3000
    };

    return testRestRpc(options, 3);
  });

});
