const express = require("express");
const authJwt = require('../middleware/authJwt');
const signinRouter = require("./auth-route");
const rootRouter = require("./root");
const adminRouter = require("./admin")
const userRouter = require("./user")
const businessRouter = require("./departments/business")
const marketingRouter = require("./departments/marketing")
const receptionRouter = require("./departments/reception")
const operatingRouter = require("./departments/operating-room")
const hrRouter = require("./departments/human-resource")




function route(app) {
  app.use("/root", rootRouter);
  app.use("/admin", adminRouter);
  app.use("/user", userRouter);
  app.use("/business", businessRouter);
  app.use("/marketing", marketingRouter);
  app.use("/reception", receptionRouter);
  app.use("/operating", operatingRouter);
  app.use("/hr", hrRouter);

  app.use("/", signinRouter);
}

module.exports = route;
