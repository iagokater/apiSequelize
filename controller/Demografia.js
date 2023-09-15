const demografia = require('../utils/sequelize').Demografia;
const Sequelize = require('sequelize');

exports.getAll = function (req, res, next) {
    demografia.findAll({
        order: [['nome', 'ASC']],
        attributes: {
            include: [
                [Sequelize.literal('TIMESTAMPDIFF(YEAR, DataNascimento, CURDATE())'), 'Idade'],
                [Sequelize.literal('TIMESTAMPDIFF(YEAR, InicioCarreira, CURDATE())'), 'TempoCarreira']
            ]
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
    demografia.findByPk(req.params.iddemografia)
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
    demografia.create(req.body)
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
    demografia.update(req.body, {
        where: {
            iddemografia: req.params.iddemografia
        }
    })
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

exports.delete = function (req, res, next) {
    demografia.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(
            value => {
                res.status(200).json(
                    "Deletado com sucesso!"
                )
            }
        )
        .catch(
            errors => {
                next(errors);
            }
        )
}
