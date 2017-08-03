#! /usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const NodeCouchDb = require('node-couchdb');


const couch = new NodeCouchDb({
  auth: {
    user: 'scott',
    password: 'tiger'
  }
});


const app = express();
const dbName = 'customers';
const viewUrl = '_design/customers/_view/all_customers';


//Configure Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));



app.get('/', function(req, res) {
  couch.get(dbName, viewUrl).then(
    function(data, headers, status) {
      let xs = data.data.rows.map( x => { return x.value } );
      console.log(JSON.stringify(xs, null, 2));
      res.render('index', { customers: xs});
    },
    function(err) {
      res.send(err);
    });
});



app.post('/customer/add', function(req, res) {
  const name = req.body.name;
  const email = req.body.email;

  couch.uniqid().then( function(ids) {
    const id = ids[0];
    couch.insert('customers', {
      _id: id,
      name: name,
      email: email
    }).then(
      function(data, headers, status){
        res.redirect('/');
      },
      function(err) {
        res.send(err);
      }
    );
  });
});



app.post('/customer/delete/:id', function(req, res) {
  const id = req.params.id;
  const rev = req.body.rev;

  couch.del(dbName, id, rev).then(
    function(data, header, status){
      res.redirect('/');
    },
    function(err) {
      res.send(err);
  });
});



app.listen(8000, ()=> {
  console.log('Listening on 8000...');
});



couch.listDatabases().then( (dbs) => console.log(dbs) );
