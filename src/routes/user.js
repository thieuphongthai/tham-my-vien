// [GET] Nhận tài nguyên công khai và được bảo vệ

const { authJwt } = require("../middleware/authJwt");
const controller = require("../app/controllers/UserController");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/test/all", controller.allAccess);
  app.get("/api/test/manager", [authJwt.verifyToken], controller.managerBoard);
  app.get("/api/test/employ", [authJwt.verifyToken], controller.employBoard);
  app.get("/api/test/doctor", [authJwt.verifyToken], controller.doctorBoard);
  app.get("/api/test/nurse", [authJwt.verifyToken], controller.nurseBoard);
  app.get("/api/test/nursing", [authJwt.verifyToken], controller.nursingBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};