#! /usr/bin/env node

'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const CustomerRepository = require('./customer-repository');
const CustomerEngine = require('./customer-engine');



//Initialise and configure Express
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


//Initialise and run the app
var repo = new CustomerRepository();
var engine = new CustomerEngine(repo);
app.listen(8000, () => console.log('Listening on 8000...'));


//Event handlers
app.get('/', (req, res) => engine.onGetAllCustomers(req, res));
app.post('/customer/add', (req, res) => engine.onAddCustomer(req, res));
app.post('/customer/delete/:id', (req, res) => engine.onDeleteCustomer(req, res));
