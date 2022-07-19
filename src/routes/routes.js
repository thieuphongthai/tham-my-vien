const express = require("express");
const authJwt = require("../middleware/authJwt");
const signinRouter = require("./auth-route");
const managerMarketingRouter = require("./managers/marketing-manager");
const employMarketingRouter = require("./employes/marketing-employ");
const managerReceptionRouter = require("./managers/reception-manager");
const employReceptionRouter = require("./employes/reception-employ");
const doctorOperatingRouter = require("./managers/operating-doctor");
const nursingOperatingRouter = require("./employes/operating-nursing");
const managerHRRouter = require("./managers/human-resource-manager");
const employHRRouter = require("./employes/human-resource-employ");
const managerBusinessRouter = require('./managers/business-manager');
const employBusinessRouter = require('./employes/business-employ');

function route(app) {
  app.use("/marketing/manager", [authJwt.verifyToken, authJwt.isMarketingManager], managerMarketingRouter);
  app.use("/marketing/employ", [authJwt.verifyToken, authJwt.isMarketingEmploy], employMarketingRouter);
  app.use("/reception/manager", managerReceptionRouter);
  app.use("/reception/employ", employReceptionRouter);
  app.use("/operating/doctor", doctorOperatingRouter);
  app.use("/operating/nursing", nursingOperatingRouter);
  app.use("/hr/manager", managerHRRouter);
  app.use("/hr/employ", employHRRouter);
  app.use("/business/manager", managerBusinessRouter);
  app.use("/business/employ", employBusinessRouter);
  app.use("/", signinRouter);
}

module.exports = route;
