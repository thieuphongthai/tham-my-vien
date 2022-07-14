const express = require("express");
const authJwt = require('../middleware/authJwt');
const signinRouter = require("./auth-route");





function route(app) {

  app.use("/", signinRouter);
}

module.exports = route;
