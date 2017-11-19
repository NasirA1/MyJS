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
app.listen(process.env.PORT || 8081);

//Users database
var users = [];

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
    expiresIn: 1440 // expires in 24 hours
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



const contacts = [
  {
    id: '13',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    phone: '07945342233',
    address: '23 Main Road'
  },
  {
    id: '2',
    firstName: 'Alice',
    lastName: 'Wonderland',
    email: 'alice.wonder@gmail.com',
    phone: '',
    address: '55 Maiden Avenue'
  },
  {
    id: '6',
    firstName: 'Martin',
    lastName: 'Chol',
    email: 'mrchol@yahoo.com',
    phone: '0231223221',
    address: '34 Balmoral Road'
  },
  {
    id: '4',
    firstName: 'Sumbyla3l',
    lastName: 'Sotey',
    email: 'sotey343@msn.com',
    phone: '3222322322',
    address: '23 Main Road'
  },
  {
    id: '34',
    firstName: 'Mulla',
    lastName: 'Nasruddin',
    email: 'mullakhana@gmail.af',
    phone: '1111111111',
    address: 'Karte Charrr'
  },
  {
    id: '12',
    firstName: 'Andrew',
    lastName: 'Cole',
    email: 'coleandrewww@mail.com',
    phone: '55334343343',
    address: 'Shshshshshsss'
  }
];


function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}


app.get('/contacts', (req, res) => {
  res.json({ Items: contacts });
});


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

app.post('/contacts', (req, res) => {
  let old = contacts.find(x => { return x.id === req.body.id });
  if(old) {
    Object.assign(old, req.body);
    res.json({ message: 'ok' });
  } 
  else {
    console.log('Update failed for: ', req.body);
    res.status(403).json({
      error: 'Updated failed - contact does not exist!'
    });
  }
});
