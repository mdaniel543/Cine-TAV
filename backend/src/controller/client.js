const db = require("../db/database");

exports.getCartelera = async (req, res) => {
  try {
    const result = await db.query("CALL ObtenerCartelera()");
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getFunciones = async (req, res) => {
  try {
    const { idCartelera } = req.params;
    const result = await db.query("CALL ObtenerFunciones(?)", [idCartelera]);
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAsientosbyFuncion = async (req, res) => {
  try {
    const { idFuncion } = req.params;
    const result = await db.query("CALL ObtenerAsientosByFuncion(?)", [idFuncion]);
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
  }
}

exports.realizarVenta = async (req, res) => {
  try {
    const { idFuncion, correo, total, asientos } = req.body;
    
    // se hace una cadena de asientos separados por coma
    const asientosString = asientos.join(",");
    console.log(asientosString);

    await db.query("CALL RealizarVenta(?,?,?,?)", [idFuncion, correo, total, asientosString]);
    res.status(200).json({ message: "Venta realizada con exito" });
  } catch (error) {
    res.status(500).json({ message: error.sqlMessage });
  }
}

