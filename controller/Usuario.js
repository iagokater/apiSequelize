const usuario = require('../utils/sequelize').Usuario;

exports.getAll = function (req, res, next) {
    usuario.findAll({
        order: [['id', 'ASC']],
        attributes: {
        }
    })
    .then((values) => {
        res.status(200).json(values);
    })
    .catch((errors) => {
        next(errors);
    });
}

exports.getById = function (req, res, next) {
    usuario.findByPk(req.params.idusuario)
        .then(
            value => {
                res.status(200).json(
                    value
                )
            }
        )
        .catch(
            errors => {
                next(errors);
            }
        )
}

exports.create = function (req, res, next) {
    usuario.create(req.body)
        .then(
            value => {
                res.status(200).json(
                    value
                )
            }
        )
        .catch(
            errors => {
                next(errors);
            }
        )
}

exports.update = function (req, res, next) {
    usuario.update(req.body, {
        where: {
            id: req.params.idusuario
        }
    })
    .then(value => {
        res.status(200).json(value);
    })
    .catch(errors => {
        next(errors);
    })
}

exports.delete = function (req, res, next) {
    usuario.destroy({
        where: {
            id: req.params.idusuario
        }
    })
    .then(value => {
        res.status(200).json(value);
    })
    .catch(errors => {
        next(errors);
    })
}

exports.login = function (req, res, next) {
    usuario.findOne({
        where: {
            email: req.body.email,
            senha: req.body.senha
        }
    })
    .then(value => {
        res.status(200).json(value);
    })
    .catch(errors => {
        next(errors);
    })
}