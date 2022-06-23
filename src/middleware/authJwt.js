// Xác minh mã thông báo, kiểm tra vai trò người dùng trong cơ sở dữ liệu
const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const Account = require('../app/models/Account');
const Position = require('../app/models/Position');

verifyToken = (req, res, next) => {
    let token = req.session.token;
    if (!token) {
        return res.status(403).send({ message: "Không có mã token được cung cấp" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Không được phép đăng nhập" });
        }
        req.userId = decoded.id;
        next();
    });
};
isUser = (req, res, next) => {
    Promise.all([Account.findById(req.body._id), Role.find({})])
        .then((users, roles) => {
            if(users.role === roles.engName) {
                console.log(users.role);
                console.log(roles.engName);
                next();
                res.status(403).send({ message: "Yêu cầu vai trò người dùng!" });
                return;
            }
        })
        .catch(next);
};

isAdmin = (req, res, next) => {
    Promise.all([Account.findById(req.body._id), Role.find({})])
        .then((users, roles) => {
            if(users.role === roles.engName) {
                console.log(users.role);
                console.log(roles.engName);
                next();
                res.status(403).send({ message: "Yêu cầu vai trò quản trị viên" });
                return;
            }
        })
        .catch(next);
};

isRoot = (req, res, next) => {
    Promise.all([Account.findById(req.body._id), Role.find({})])
        .then((users, roles) => {
            if(users.role === roles.engName) {
                console.log(users.role);
                console.log(roles.engName);
                next();
                res.status(403).send({ message: "Yêu cầu vai trò gốc!" });
                return;
            }
        })
        .catch(next);
};
const authJwt = {
    verifyToken,
    isUser,
    isAdmin,
    isRoot,
};
module.exports = authJwt;