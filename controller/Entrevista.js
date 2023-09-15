const entrevista = require('../utils/sequelize').Entrevista;


exports.getAll = function (req, res, next) {
    entrevista.findAll({
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
    entrevista.findByPk(req.params.identrevista)
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
    entrevista.create(req.body)
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
exports.projecaoCarreira = function (req, res, next) {
    entrevista.update(req.body, {
      where: {
        id: req.params.identrevista
      },
      hooks: true,
      individualHooks: true,
      hookType: 'projecaoCarreira'
    })
    .then(value => {
      res.status(200).json(value);
    })
    .catch(errors => {
      next(errors);
    });
  };
  exports.planejamento = function (req, res, next) {
    entrevista.update(req.body, {
      where: {
        id: req.params.identrevista
      },
      hooks: true,
      individualHooks: true,
      hookType: 'planejamento'
    })
    .then(value => {
      res.status(200).json(value);
    })
    .catch(errors => {
      next(errors);
    });
  };
  exports.equilibrio = function (req, res, next) {
    entrevista.update(req.body, {
      where: {
        id: req.params.identrevista
      },
      hooks: true,
      individualHooks: true,
      hookType: 'equilibrio'
    })
    .then(value => {
      res.status(200).json(value);
    })
    .catch(errors => {
      next(errors);
    });
  };
  exports.update = function (req, res, next) {
    entrevista.update(req.body, {
      where: {
        id: req.params.identrevista
      },
    })
    .then(value => {
      res.status(200).json(value);
    })
    .catch(errors => {
      next(errors);
    });
  };