#! /usr/bin/env node

'use strict'

const http = require('http');
const fs = require('fs');

const PORT = 3000;



function requestHandler(req, res) {
	const content = fs.readFileSync('index.html');
	res.writeHeader(200, {ContentType: 'text/html'});
	res.end(content);	
}

let server = http.createServer(requestHandler);

server.listen(PORT);

console.log(`Listening on ${PORT}...`);
