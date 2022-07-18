// Trả về nội dung công khai và được bảo vệ

class getUI {
    rootBoard(req, res) {
        res.status(200).render('/root');
    };
    adminBoard(req, res) {
        res.status(200).send("/admin");
    };
    userBoard(req, res) {
        res.status(200).send("/user");
    };
}

module.exports = new getUI;
