const pipeline = require('../controller/Pipeline');
const router = require("express").Router();

router.route ("/")
    .get(pipeline.getAll)
    .post(pipeline.create)
    .put(pipeline.update);

router.route("/:idpipeline")
    .get(pipeline.getById)
    .put(pipeline.update)
    .delete(pipeline.delete);

module.exports = router;