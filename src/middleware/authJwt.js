// Xác minh mã thông báo, kiểm tra vai trò người dùng trong cơ sở dữ liệu
const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const Account = require('../app/models/Account');
const Role = require('../app/models/Role');

verifyToken = (req, res, next) => {
    let token = req.session.token;
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};
isAdmin = (req, res, next) => {
    Account.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Role.find(
            {
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }
                res.status(403).send({ message: "Require Admin Role!" });
                return;
            }
        );
    });
};
isRoot = (req, res, next) => {
    Account.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Role.find(
            {
                _id: { $in: user.role },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "moderator") {
                        next();
                        return;
                    }
                }
                res.status(403).send({ message: "Require Moderator Role!" });
                return;
            }
        );
    });
};
const authJwt = {
    verifyToken,
    isAdmin,
    isRoot,
};
module.exports = authJwt;