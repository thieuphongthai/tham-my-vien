const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const Customer = require('../models/Customer')

class CustomerController{
    getCustomerDashboard(req, res, next){
        Customer.find({})
            .then(customers => {
                res.render('customers/customer',{
                    customers: multipleMongooseToObject(customers)
                });
            })
            .catch(next);
    }

    // [POST]
    createCustomer(req, res, next){
        const customer = new Customer(req.body);
        customer.save()
            .then(() => res.redirect('customer'))
            .catch(next)
    }

    editCustomer(req, res, next){
        Customer.findById(req.params.id) 
            .then(customer => res.render('customers/update',{
                customer: mongooseToObject(customer)
            }))
            .catch(next);
        
    }

    updateCustomer(req, res, next){
        Customer.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/customer'))
            .catch(next);
    }

    // deleteCustomer(req, res, next){
    //     Customer.deleteOne({_id: req.params.id}, req.body)
    //         then(() => res.redirect('/customer'))
    //         .catch(next);
    // }

}

module.exports = new CustomerController;