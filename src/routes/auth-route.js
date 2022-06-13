// [POST] Đăng ký, đăng nhập và đăng nhập

const express = require('express');
const router = express.Router();
const verifySignUp = require("../middleware/VerifySignUp");
const controller = require("../app/controllers/AuthController");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
            );
            next();
        }
    );
    

};

router.post("/signup",[verifySignUp.checkUsernameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
router.post("/signin", controller.signin);
router.post("/signout", controller.signout);
router.get('/signin', controller.getSignin);
router.get('/signup', controller.getSignup);
router.get('/', controller.getSignin);

module.exports = router;