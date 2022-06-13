const express = require('express');
const managerRouter = require('./manager');
const signinRouter = require('./auth-route');
const adminRouter = require('./admin');
const userRouter = require('./user');
const accountRouter = require('./account');
const departmentRouter = require('./department');
const roleRouter = require('./role');
const serviceRouter = require('./service');
const statusRouter = require('./status');


function route(app) {

    app.use('/admin', adminRouter);
    app.use('/user', userRouter);
    app.use('/account', accountRouter);
    app.use('/department', departmentRouter);
    app.use('/role', roleRouter);
    app.use('/service', serviceRouter);
    app.use('/status', statusRouter);
    app.use('/manager', managerRouter);
    app.use('/', signinRouter);
}

module.exports = route;