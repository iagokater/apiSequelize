const demografia = require('../controller/Demografia');
const router = require("express").Router();

router.route ("/")
    .get(demografia.getAll)
    .post(demografia.create)

router.route("/:iddemografia")
    .get(demografia.getById)
    .put(demografia.update)
    .delete(demografia.delete);

module.exports = router;