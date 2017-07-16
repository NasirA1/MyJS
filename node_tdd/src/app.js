#! /usr/bin/env node

'use strict'

const express = require('express');
const app = express();
const port = 3000;



function run() {
    return new Promise( (resolve, reject) => {
        app.listen(port, 
            err => { console.log('ERROR: ' + err); reject(err); },
            ()  => { resolve('listening on port ...' + port); },
        );
    });
}


app.get('/add', (req, res) => {
    res.send('0');
});


run().then(msg => console.log(msg))
    .catch(err => console.error(err));

