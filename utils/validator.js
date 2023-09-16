const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.validate = (req, res, next) => {
    try {
        let token = jwt.verify(req.headers.api_key, "cultivando");
        console.log(token);
        req.body.user = token;
        next();
    } catch(error) {
        err = new Error("Necessário fazer login");
        err.status = 401;
        next(err);
    } 
}
