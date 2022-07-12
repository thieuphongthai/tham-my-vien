// Xác minh mã thông báo, kiểm tra vai trò người dùng trong cơ sở dữ liệu
const jwt = require("jsonwebtoken");
const Account = require('../app/models/Account');
const Role = require('../app/models/Role');

class authJwt {
    verifyToken(req, res, next){
        let token = req.headers["x-access-token"];
        console.log('auth token', token);
        if (!token) {
            return res.status(403).send({ message: "Không có mã token được cung cấp" });
        }
        jwt.verify(token, process.env.ACCESSTOKEN_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Không được phép đăng nhập" });
            }
            req.userId = decoded.id;
            next();
        });
    };
    isUser(req, res, next) {
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
    
    isAdmin(req, res, next) {
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
    
    isRoot(req, res, next) {
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
}

module.exports = new authJwt;