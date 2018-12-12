#! /usr/bin/env node

'use strict'

const http = require('http');
const fs = require('fs');
const index = fs.readFileSync('index.html');

console.log('server started.');
console.log('serving pages on localhost:9000...');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
}).listen(9000);
