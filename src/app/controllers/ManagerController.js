const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const Customer = require('../models/Customer');
const User = require('../models/User');

class ManagerController{

    getManagerDasboard(req, res, next){
        res.render('manager/manager');
    }
    //CUSTOMER
    //[GET] Read customer from database
    getCustomerDashboard(req, res, next){
        Customer.find({})
            .then(customers => {
                res.render('manager/customer',{
                    customers: multipleMongooseToObject(customers)
                });
            })
            .catch(next);
    }

    //[POST] Create new customer 
    createCustomer(req, res, next){
        const customer = new Customer(req.body);
        customer.save()
            .then(() => res.redirect('customer'))
            .catch(next)
    }

    editCustomer(req, res, next){
        Customer.findById(req.body.id) 
            .then(customer => res.render('customer',{
                customer: mongooseToObject(customer)
            }))
            .catch(next);
    }

    
    // [PUT] Update customer
    updateCustomer(req, res, next){
        Customer.updateOne({_id: req.body.id}, req.body)
            .then(() => res.redirect('/manager/customer'))
            .catch(next);
    }

    // deleteCustomer(req, res, next){
    //     Customer.deleteOne({_id: req.params.id}, req.body)
    //         then(() => res.redirect('/customer'))
    //         .catch(next);
    // }
    // END CUSTOMER

    //EMPLOYEE
    getUserDashboard(req, res, next){
        User.find({})
            .then(users => {
                res.render('manager/user',{
                    users: multipleMongooseToObject(users)
                });
            })
            .catch(next);
    }

    //END EMPLOYEE
}

module.exports = new ManagerController;