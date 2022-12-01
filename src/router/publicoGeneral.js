const express = require("express");
const publicoGeneralController = require("../controllers/publicoGeneralController");

const router = express.Router();

router.get('/enviarPropuesta', publicoGeneralController.enviarPropuesta)
router.post("/enviarPropuesta", publicoGeneralController.registrarPropuesta)

module.exports = router;