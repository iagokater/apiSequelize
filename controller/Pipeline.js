const pipeline = require('../utils/sequelize').Pipeline;

exports.getAll = function (req, res, next) {
    pipeline.findAll({
        order: [['Id', 'ASC']],
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
    pipeline.findByPk(req.params.idpipeline)
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
    pipeline.create(req.body)
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
    pipeline.update(req.body, {
        where: {
            id: req.params.idpipeline
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
    pipeline.destroy({
        where: {
            id: req.params.idpipeline
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

