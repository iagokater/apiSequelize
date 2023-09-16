const usuario = require('../controller/Usuario');
const router = require("express").Router();

router.route ("/")
    .get(usuario.getAll)
    .post(usuario.create)

router.route("/login")
    .post(usuario.login)

module.exports = router;