const cargo = require('../utils/sequelize').Cargo;

exports.getAll = function (req, res, next) {
    cargo.findAll({
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
    cargo.findByPk(req.params.idcargo)
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
    cargo.create(req.body)
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
    cargo.update(req.body, {
        where: {
            id: req.params.idcargo
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
    cargo.destroy({
        where: {
            id: req.params.idcargo
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


