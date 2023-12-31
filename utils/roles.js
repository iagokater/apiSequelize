require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.adminRole = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const role = decodedToken.tipo;

        if (role == process.env.Admin) {
            next();                
        } else {
            return res.status(401).json({ message: 'Você não tem permissão para realizar esta ação!' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error ...' });
    }
}

exports.consultorRole = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const role = decodedToken.tipo;

        if (role == process.env.Consultor) {
            next();                
        } else {
            return res.status(401).json({ message: 'Você não tem permissão para realizar esta ação!' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error ...' });
    }
}

exports.analistaRole = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const role = decodedToken.tipo;

        if (role == process.env.Analista || role == process.env.Admin || role == process.env.Consultor) {
            next();                
        } else {
            return res.status(401).json({ message: 'Você não tem permissão para realizar esta ação!' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error ...' });
    }    
}