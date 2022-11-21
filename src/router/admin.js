const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.get('/homeAdmin', adminController.listarPolinizadores);
router.post('/registrarPolinizador', adminController.registrarPolinizador);
router.get('/listarFlora', adminController.listarFlora);
router.post('/registrarFlora', adminController.registrarFlora)

module.exports = router;