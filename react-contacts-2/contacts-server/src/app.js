#! /usr/bin/env node

'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.listen(process.env.PORT || 8080);



//Databases
var users = [{
  email: 'a@a.aa',
  firstName: 'Aa',
  lastName: 'AAA',
  password: 'aaaaaa'
}];



var contacts = {
  'a@a.aa' : require('../data/sample-contacts')
};



function validateReqistrationRequest(body) {
  const valid = 
    validator.isAlpha(body.firstName) && 
    validator.isEmail(body.email) &&
    validator.isLength(body.password, { min: 6, max: 32 })
  ? true: false; //Ensures a boolean result is always returned (not undefined or null)
  return valid;
}


function createToken(payload) {
  let token = jwt.sign(payload, 'secret', {
    expiresIn: 3600 //expires 1 hour
  });

  return token;
}



let apiRoutes = express.Router();

apiRoutes.use( function(req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token) {
    jwt.verify(token, 'secret', (err, decoded) => {
      if(err)
        return res.status(401).json({ error: 'Failed to authenticate token' });
      else {
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    return res.status(403).json({ error: 'No token provided' });
  }
});


app.post('/register', (req, res) => {
  if (!validateReqistrationRequest(req.body)) {
    console.log('Invalid request: ', req.body);
    res.status(400).json({
      error: 'Invalid request. Send valid data!'
    });
    return;
  }

  if(users.find(x => { return x.email === req.body.email })) {
    console.log('User already registered: ', req.body);
    res.status(409).json({
      error: 'Invalid request. User already registered!'
    });
    return;    
  }

  users.push(req.body);
  contacts[req.body.email] = [];

  try {
    res.json({
      message: 'User registered successfully.'
    });  
  }
  catch(err) {
    res.status(500).json({
      error: err
    });
  }
});


app.post('/login', (req, res) => {
  const user = users.find(x => { return x.email === req.body.email && x.password === req.body.password });
  if(user) {
    console.log('Login - User matched: ', req.body);
    const token = createToken(req.body);
    res.json({
      firstName: user.firstName,
      token: token,
      message: `Welcome, ${user.firstName}!`
    });
  }
  else {
    console.log('Login failed - No User match: ', req.body);
    res.status(403).json({
      error: 'Login failed - No user match'
    });
  }
});


function generateId(userId) {
  const max = contacts[userId].length > 0? Math.max.apply(Math, contacts[userId].map((contact) => contact.id)): 0;
  return (max + 1).toString();
}


function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}


app.get('/members/:email', (req, res) => {
  //console.log(JSON.stringify(users, 2));
  if(users.find(x => { return x.email === req.params.email })) {
    console.log(`${req.params.email} exists.`);
    res.json({exists: true});
  }
  else {
    console.log(`${req.params.email} available for registration!`);
    res.json({exists: false});    
  }
});


/// From this point below, all endpoints require a token
app.use('/', apiRoutes);


app.get('/contacts', (req, res) => {
  const pageSize = req.query.pageSize? parseInt(req.query.pageSize, 10): contacts[req.decoded.email].length;
  const activePage = req.query.activePage? parseInt(req.query.activePage, 10): 1;
  console.log(`{ pageSize: ${pageSize}, activePage= ${activePage}}`);

  let subset = contacts[req.decoded.email].slice(pageSize * (activePage - 1),  pageSize * (activePage - 1) + pageSize);

  res.json({ 
    Items: subset,
    totalRows:  contacts[req.decoded.email].length
  });
});


app.post('/contacts', (req, res) => {
  let old = contacts[req.decoded.email].find(x => { return x.id === req.body.id });
  if(old) {
    Object.assign(old, req.body);
    res.json({ message: 'ok' });
  } 
  else {
    console.log('Update failed for: ', req.body);
    res.status(400).json({
      error: 'Updated failed - contact does not exist!'
    });
  }
});


app.put('/contacts', (req, res) => {
  let exists = contacts[req.decoded.email].find(x => { return x.id === req.body.id });
  if(!exists) {
    req.body.id = generateId(req.decoded.email);
    contacts[req.decoded.email].push(req.body);
    res.json({ message: 'ok', id: req.body.id });
  } 
  else {
    console.log('Insert failed for: ', req.body);
    res.status(409).json({
      error: 'Insert failed - Contact already exists!'
    });
  }
});


app.post('/contacts/delete', (req, res) => {
  let deleted = [];

  req.body.ids.forEach(id => {
    let found = contacts[req.decoded.email].find(x => { return x.id === id });
    if(found) {
      contacts[req.decoded.email].splice(contacts[req.decoded.email].indexOf(found), 1);
      deleted.push(id);
    }
  });

  res.json({ message: 'ok', deleted: deleted});
});
