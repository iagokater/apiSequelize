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


exports.login = function(req, res, next) {
    
    usuario.findAll({
        where: {
            "email": req.body.email
        }
    })
    .then(
        values => {
            if (values.length) {

                usuario.validatePassword(req.body.senha, values, (error, auth) => {
                    
                    if (error) {
                        error.status = 500;
                        next(error);
                    } else {

                        if (!auth) {

                            res.status(200).json(
                                {
                                    "auth": false
                                }
                            )

                        } else {

                            usuario.generateToken(values, (err, token) => {

                                if (err) {

                                    
                                        err.status = 500;
                                        next(err);

                                } else {

                                    values[0].senha = undefined;

                                    res.status(201).json(
                                        {
                                            "auth": true,
                                            "token": token,
                                            "user": values[0]
                                        }
                                    )

                                }

                            });

                        }

                    }
                
                });
                    
            } else {

                res.status(404).json({
                    "auth": false
                });

            }
        }
    )
    .catch(
        errors => {
            next(errors);
        }
    )
}
