const negocio = require('../controller/negocio');
const router = require("express").Router();

router.route ("/")
    .get(negocio.getAll)
    .post(negocio.create)
    .put(negocio.update);

router.route("/:idnegocio")
    .get(negocio.getById)
    .put(negocio.update)
    .delete(negocio.delete);

module.exports = router;