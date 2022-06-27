const express = require("express");
const authJwt = require('../middleware/authJwt');
const signinRouter = require("./auth-route");
const rootRouter = require("./root");
const adminRouter = require("./admin")
const userRouter = require("./user")



function route(app) {
  app.use("/root", rootRouter);
  app.use("/admin", adminRouter);
  app.use("/user", [authJwt.verifyToken, authJwt.isUser], userRouter);
  app.use("/", signinRouter);
}

module.exports = route;
