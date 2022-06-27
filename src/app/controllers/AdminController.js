const Customer = require("../models/Customer")
const Department = require("../models/Department")
const User = require("../models/User");
const Account = require("../models/Account");
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');



class AdminController {

  getAdminDashboard(req, res, next) {
    res.render("admin/admin-login");
  }

  //CUSTOMER
  getAdminCustomer(req, res, next) {
    Customer.find({})
      .then(customers => {
        res.render('admin/admin-customer', {
          customers: multipleMongooseToObject(customers)
        });
      })
      .catch(next);
  }

  createCustomer(req, res, next) {
    const customer = new Customer(req.body);
    customer.save()
      .then(() => res.redirect('customer'))
      .catch(next)
  }

  editCustomer(req, res, next) {
    Customer.findById(req.params.id)
      .then(customer => res.render('admin/admin-editcustomer', {
        customer: mongooseToObject(customer)
      }))
      .catch(next);
  }

  updateCustomer(req, res, next) {
    Customer.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/admin/customer'))
      .catch(next);
  }
  //END CUSTOMER

  //USER
  getAdminUser(req, res, next) {
    User.find({})
      .then(users => {
        res.render("admin/admin-user", {
          users: multipleMongooseToObject(users)
        });
      })
      .catch(next);
  }
  //END USER

  //DEPARTMENT
  getAdminDepartment(req, res, next) {
    Department.find({})
      .then(departments => {
        res.render("admin/admin-department", {
          departments: multipleMongooseToObject(departments)
        });
      })
      .catch(next);
  }


  //END DEPARTMENT

  //ACCOUNT
  getAdminAccount(req, res, next) {
    Account.find({})
      .then(accounts => {
        res.render("admin/admin-account", {
          accounts: multipleMongooseToObject(accounts)
        });
      })
      .catch(next);
  }
  //END ACCOUNT

}

module.exports = new AdminController;