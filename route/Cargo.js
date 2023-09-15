const cargo = require('../controller/Cargo');
const router = require("express").Router();

router.route ("/") 
    .get(cargo.getAll)
    .post(cargo.create)
    .put(cargo.update);

router.route("/:idcargo")
    .get(cargo.getById)
    .put(cargo.update)
    .delete(cargo.delete);

module.exports = router;
