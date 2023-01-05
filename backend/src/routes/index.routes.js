const express = require("express");
const router = express.Router();

const clientController = require("../controller/client");

const adminController = require("../controller/admin");

router.get("/cartelera", clientController.getCartelera);
router.get("/funciones/:idCartelera", clientController.getFunciones);
router.get("/asientos/:idFuncion", clientController.getAsientosbyFuncion);
router.post("/venta", clientController.realizarVenta);

router.get("/peliculas", adminController.getPeliculas);
router.get("/salas", adminController.getSalas);
router.get("/tipos", adminController.getTipoFunciones);
router.post("/funcion", adminController.createFuncion);

module.exports = router;
