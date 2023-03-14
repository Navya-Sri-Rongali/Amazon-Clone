const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {

    try {
        let token = req.header('token');
        if (!token) {
            console.log(req.header);
            return res.status(400).send("token not found");
        }
        let decoded = jwt .verify(token, 'jwtPassword');
        req.user = decoded.user;
        next();
    }
    catch (err) {
        res.status(400).send("auth error");
    }
}