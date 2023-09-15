const entrevista = require('../controller/Entrevista');
const router = require("express").Router();

router.route ("/")
    .get(entrevista.getAll)
    .post(entrevista.create)
router.route("/projecao/:identrevista")
    .patch(entrevista.projecaoCarreira)
router.route("/planejamento/:identrevista")
    .patch(entrevista.planejamento)
router.route("/equilibrio/:identrevista")
    .patch(entrevista.equilibrio)
router.route("/:identrevista")
    .patch(entrevista.update)
module.exports = router;
