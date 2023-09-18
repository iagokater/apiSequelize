const cargo = require('../controller/Cargo');
const router = require("express").Router();
const login = require('../utils/login');
const roles = require('../utils/roles');

router.route ("/") 
    .get( login.verifyToken, roles.analistaRole, cargo.getAll)
    .post(cargo.create)
    .put(cargo.update);

router.route("/:idcargo")
    .get(cargo.getById)
    .put(cargo.update)
    .delete(cargo.delete);

module.exports = router;
