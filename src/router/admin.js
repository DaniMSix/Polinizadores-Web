const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.get('/homeAdmin', adminController.listarPolinizadores);
router.post('/registrarPolinizador', adminController.registrarPolinizador);

module.exports = router;