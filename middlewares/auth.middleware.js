require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(400).send({ message: "Please login again" });
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) return res.status(400).json({ msg: "Something went wrong, Please login again" });
        req.body.userId = decoded.user._id;
        // console.log(decoded)
        next();
    });
};

module.exports = auth;