#! /usr/bin/env node

'use strict'

const express = require('express');
const app = express();
const port = 3000;



function run() {
    return new Promise( (resolve, reject) => {
        app.listen(port, 
            err => { console.log('ERROR: ' + err); reject(err); },
            ()  => { resolve('listening on port ...' + port); }
        );
    });
}


function handleGet(req, res) {
	let x = parseInt(req.query.x);
	let y = parseInt(req.query.y);
	let result = x + y;
    res.send(result.toString());
}


app.get('/add', handleGet);


run().then(msg => console.log(msg))
    .catch(err => console.error(err));


module.exports = {
	handleGet : handleGet
}
