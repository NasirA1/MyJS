'use strict'

const NodeCouchDb = require('node-couchdb');


const couch = new NodeCouchDb({
  auth: {
    user: 'scott',
    password: 'tiger'
  }
});


function transformCustomerArray(dbArray){
  let xs = dbArray.map( x => { return x.value } );
  console.log(JSON.stringify(xs, null, 2));
  return xs;
}


module.exports = class CustomerRepository {

  constructor() {
    this.dbName = 'customers';
    this.viewUrl = '_design/customers/_view/all_customers';
    this.listDatabases();
  }


  listDatabases() {
    couch.listDatabases()
      .then( dbs => console.log(dbs) )
      .catch( err => console.warn(err) );
  }


  getAllCustomers() {
    return new Promise( (resolve, reject) => {
      couch.get(this.dbName, this.viewUrl).then(
        function(data, headers, status) {
          resolve(transformCustomerArray(data.data.rows));
        },
        function(err) { reject(err); }
      );
    });
  }


  addCustomer(customer) {
    return new Promise( (resolve, reject) => {
      couch.uniqid().then(
        function(ids) {
          customer._id = ids[0];
          couch.insert(this.dbName, customer).then(
            function(data, headers, status){ resolve('ok'); },
            function(err) { reject(err); }
          );
        }
      );
    });
  }


  deleteCustomer(id, rev) {
    return new Promise( (resolve, reject) => {
      couch.del(this.dbName, id, rev).then(
        function(data, header, status){ resolve('ok'); },
        function(err) { reject(err); }
      );
    });
  }
}
