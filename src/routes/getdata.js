// [GET] Nhận tài nguyên công khai và được bảo vệ

const { authJwt } = require("../middleware/authJwt");
const controller = require("../app/controllers/GetDataController");
module.exports = function(app) {
  	app.use(function(req, res, next) {
    	res.header(
      		"Access-Control-Allow-Headers",
      		"Origin, Content-Type, Accept"
    	);
    	next();
  	});
  	app.get("/manager", [authJwt.verifyToken], controller.managerBoard);
  	app.get("/employ", [authJwt.verifyToken], controller.employBoard);
  	app.get("/doctor", [authJwt.verifyToken], controller.doctorBoard);
  	app.get("/nurse", [authJwt.verifyToken], controller.nurseBoard);
  	app.get("/nursing", [authJwt.verifyToken], controller.nursingBoard);
 	app.get("/root", [authJwt.verifyToken, authJwt.isRoot], controller.rootBoard);
  	app.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
};