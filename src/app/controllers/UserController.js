// Trả về nội dung công khai và được bảo vệ

exports.managerBoard = (req, res) => {
    res.status(200).send("Manager Content.");
};
exports.employBoard = (req, res) => {
    res.status(200).send("Employ Content.");
};
exports.doctorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};
exports.nurseBoard = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.nursingBoard = (req, res) => {
    res.status(200).send("Public Content.");
};