// Trả về nội dung công khai và được bảo vệ

exports.rootBoard = (req, res) => {
    res.status(200).render('/login');
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
exports.doctorBoard = (req, res) => {
    res.status(200).send("Doctor Content.");
};
exports.nurseBoard = (req, res) => {
    res.status(200).send("Nurse Content.");
};
exports.nursingBoard = (req, res) => {
    res.status(200).send("Nursing Content.");
};

exports.saleManagerBoard = (req, res) => {
    res.status(200).send("Sale Manager Content.");
};

exports.saleEmployBoard = (req, res) => {
    res.status(200).send("Sale Employ Content.");
};

exports.receptionManagerBoard = (req, res) => {
    res.status(200).send("Reception Manager Content.");
};
exports.receptionEmployBoard = (req, res) => {
    res.status(200).send("Reception Employ Content.");
};
exports.marketingManagerBoard = (req, res) => {
    res.status(200).send("Marketing Manager Content.");
};
exports.marketingEmployBoard = (req, res) => {
    res.status(200).send("Marketing Manager Content.");
};