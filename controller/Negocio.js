const negocio = require('../utils/sequelize').Negocio;

exports.getAll = function (req, res, next) {
    negocio.findAll({
        order: [['nome', 'ASC']],
        attributes: {
        }
    })
        .then(
            values => {
                res.status(200).json(
                    values
                )
            }
        )
        .catch(
            errors => {
                next(errors);
            }
        )
}

exports.getById = function (req, res, next) {
    negocio.findByPk(req.params.idnegocio)
        .then(
            values => res.status(200).json(
                values
            )
        )
        .catch(
            errors => next(errors)
        )
}

exports.create = function (req, res, next) {
    negocio.create(req.body)
        .then(
            values => res.status(201).json(
                values
            )
        )
        .catch(
            errors => next(errors)
        )
}

exports.update = function (req, res, next) {
    negocio.update(req.body, {
        where: {
            id: req.params.idnegocio
        }
    })
        .then(
            values => res.status(200).json(
                values
            )
        )
        .catch(
            errors => next(errors)
        )
}

exports.delete = function (req, res, next) {
    negocio.destroy({
        where: {
            id: req.params.idnegocio
        }
    })
        .then(
            values => res.status(200).json(
                values
            )
        )
        .catch(
            errors => next(errors)
        )
}


