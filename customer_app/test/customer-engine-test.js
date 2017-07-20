'use strict'

const chai = require('chai');
const assert = require('chai').assert;
const sinon = require('sinon');
const CustomerEngine = require('../src/customer-engine');


//In-memory customer database
class TestCustomerRepository {
  constructor() {
    this.database = [
      {
        "_id": "1",
        "_rev": "1-100",
        "name": "John Doe",
        "email": "johndoe@gmail.com"
      },
      {
        "_id": "2",
        "_rev": "1-101",
        "name": "Sumby khan",
        "email": "sumbhlhan@gmail.com"
      }
    ];
  }


  getAllCustomers() {
    return Promise.resolve(this.database);
  }


  addCustomer(customer) {
    this.database.push(customer);
    return Promise.resolve('ok');
  }


  deleteCustomer(id, rev) {
    for(let i = 0; i < this.database.length; i++){
      if(this.database[i]._id == id)
        this.database.splice(i, 1);
    }
  }
}



describe('CustomerEngine Tests', function() {

  //Mock response object
  var mockRes = sinon.mock( {
    render: function(page, customers) {},
    send: function(err) {},
    redirect: function(url) {}
  });


  it('Constructor initialises the engine with the given repository', function() {
    //1. Prepare
    var repo = new TestCustomerRepository();

    //2. Act
    var engine = new CustomerEngine(repo);

    //3. Assert
    assert.equal(engine.customerRepo, repo);
  });


  it('onGetAllCustomers sends retrieved customers to the client', function() {
    return new Promise( (resolve, reject) => {
      //1. Initialise
      var repo = new TestCustomerRepository();
      var engine = new CustomerEngine(repo);

      //2. Set expectations
      mockRes.expects('render').withArgs('index', { customers: repo.database } );

      //3. Act
      engine.onGetAllCustomers(null, mockRes.object).then(() => {

      //3. Assert
        if(mockRes.verify()) resolve('pass');
      })
      .catch(ex => reject(ex));
    });
  });


  it('onGetAllCustomers sends error info to the client upon error', function() {
    return new Promise( (resolve, reject) => {
      //1. Initialise
      var repo = new TestCustomerRepository();
      var engine = new CustomerEngine(repo);

      //Fake an error returned from repository
      sinon.stub(repo, 'getAllCustomers').callsFake(() => {
        return Promise.reject('oops! error details...');
      });

      //2. Set expectations
      mockRes.expects('send').withArgs('oops! error details...');

      //3. Act
      engine.onGetAllCustomers(null, mockRes.object).then(() => {

      //4. Assert
        if(mockRes.verify()) resolve('pass');
      })
      .catch(ex => reject(ex));
    });
  });


  it('onAddCustomer adds new customer and redirects client to the main page', function() {
    return new Promise( (resolve, reject) => {
      //1. Initialise
      var repo = new TestCustomerRepository();
      var engine = new CustomerEngine(repo);

      var mockReq = {
        body: {
          name: 'John Smith',
          email: 'john.smith@hotmail.com'
        }
      };

      //2. Set expectations
      mockRes.expects('redirect').withArgs('/');

      //3. Act
      engine.onAddCustomer(mockReq, mockRes.object)

      //4. Assert
      .then( () => {
        if(mockRes.verify()) return Promise.resolve('pass');
        else return Promise.reject(new Error('failed to call expected function'));
      })
      .then( () => {
        if(repo.database.length == 3) return Promise.resolve('pass!');
        else return Promise.reject(new Error('Customer was not added to database'));
      })
      .then( ok => resolve(ok))
      .catch( ex => reject(ex));
    });
  });


  it('onAddCustomer sends error info to the client upon error', function() {
    return new Promise( (resolve, reject) => {
      //1. Initialise
      var repo = new TestCustomerRepository();
      var engine = new CustomerEngine(repo);

      var mockReq = {
        body: {
          name: 'John Smith',
          email: 'john.smith@hotmail.com'
        }
      };

      //Fake an error returned from repository
      sinon.stub(repo, 'addCustomer').callsFake((customer) => {
        return Promise.reject('oops! error details...');
      });

      //2. Set expectations
      mockRes.expects('send').withArgs('oops! error details...');

      //3. Act
      engine.onAddCustomer(mockReq, mockRes.object)

      //4. Assert
      .then( () => {
        if(mockRes.verify()) resolve('pass');
      })
      .catch(ex => reject(ex));
    });
  });


});
