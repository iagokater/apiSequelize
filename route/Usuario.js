const usuario = require('../controller/Usuario');
const router = require("express").Router();

router.route ("/")
    .get(usuario.getAll)
    .post(usuario.create)

router.route("/:idusuario")
    .get(usuario.getById)
    .put(usuario.update)
    .delete(usuario.delete);

module.exports = router;