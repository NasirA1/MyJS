'use strict'

const chai = require('chai');
const assert = require('chai').assert;
const sinon = require('sinon');
const sinonStubPromise = require('sinon-stub-promise');
const CustomerEngine = require('../src/customer-engine');

sinonStubPromise(sinon);


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

  var repo, engine;
  var mockRes = sinon.mock( {
    render: function(page, customers) {},
    send: function(err) {},
    redirect: function(url) {}
  });


  beforeEach( () => {
      repo = new TestCustomerRepository();
      engine = new CustomerEngine(repo);
  });

  afterEach( () => {
    mockRes.restore();
  });



  it('Constructor initialises the engine with the given repository', function() {
    assert.equal(engine.customerRepo, repo);
  });



  it('onGetAllCustomers sends retrieved customers to the client', function() {
    return new Promise( (resolve, reject) => {

      mockRes.expects('render').withArgs('index', { customers: repo.database } );

      engine.onGetAllCustomers(null, mockRes.object).then(() => {
        if(mockRes.verify()) resolve('pass');
      })
      .catch(ex => reject(ex));
    });
  });



  it('onGetAllCustomers sends error info to the client upon error', function() {
    return new Promise( (resolve, reject) => {

      //Fake an error returned from repository
      var stub = sinon.stub(repo, 'getAllCustomers');
      stub.returnsPromise().rejects('oops! error details...');      

      mockRes.expects('send').withArgs('oops! error details...');

      engine.onGetAllCustomers(null, mockRes.object).then(() => {
        if(mockRes.verify()) { 
          stub.restore();
          resolve('pass');
        }
      })
      .catch(ex => reject(ex));
    });
  });



  it('onAddCustomer adds new customer and redirects client to the main page', function() {
    return new Promise( (resolve, reject) => {

      var mockReq = {
        body: {
          name: 'John Smith',
          email: 'john.smith@hotmail.com'
        }
      };

      mockRes.expects('redirect').withArgs('/');

      engine.onAddCustomer(mockReq, mockRes.object)
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
  });  //end-it



  it('onAddCustomer sends error info to the client upon error', function() {
    return new Promise( (resolve, reject) => {

      var mockReq = {
        body: {
          name: 'John Smith',
          email: 'john.smith@hotmail.com'
        }
      };

      //Fake an error returned from repository
      var stub = sinon.stub(repo, 'addCustomer');
      stub.returnsPromise().rejects('oops! error details...');

      mockRes.expects('send').withArgs('oops! error details...');

      engine.onAddCustomer(mockReq, mockRes.object)
      .then( () => {
        if(mockRes.verify()) { 
          stub.restore();
          resolve('pass');
        }
      })
      .catch(ex => reject(ex));
    });

  }); //end-it


});
