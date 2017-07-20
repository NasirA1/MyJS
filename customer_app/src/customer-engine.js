'use strict'


module.exports = class CustomerEngine
{
  constructor(customerRepo) {
    this.customerRepo = customerRepo;
  }

  onGetAllCustomers(req, res) {
    return this.customerRepo.getAllCustomers()
      .then( xs => res.render('index', { customers: xs}) )
      .catch( err => res.send(err) );
  }


  onAddCustomer(req, res) {
    var customer = {
      name: req.body.name,
      email: req.body.email
    };

    return this.customerRepo.addCustomer(customer)
      .then( ok => res.redirect('/'))
      .catch( err => res.send(err) );
  }


  onDeleteCustomer(req, res) {
    const id = req.params.id;
    const rev = req.body.rev;

    return this.customerRepo.deleteCustomer(id, rev)
      .then( ok => res.redirect('/'))
      .catch( err => res.send(err) );
  }
}
