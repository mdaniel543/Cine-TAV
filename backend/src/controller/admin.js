const db = require("../db/database");

exports.getPeliculas = async (req, res) => {
  try {
    const result = await db.query("CALL ObtenerPeliculas()");
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getSalas = async (req, res) => {
  try {
    const result = await db.query("CALL ObtenerSala()");
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getTipoFunciones = async (req, res) => {
  try {
    const result = await db.query("CALL ObtenerTipo()");
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createFuncion = async (req, res) => {
  try {
    const {
      idPelicula,
      idSala,
      idTipoFuncion,
      idCartelera,
      HoraInicio,
      HoraFin,
      Precio,
    } = req.body;
    await db.query("CALL CrearFuncion(?,?,?,?,?,?,?)", [
      idPelicula,
      idTipoFuncion,
      idSala,
      idCartelera,
      HoraInicio,
      HoraFin,
      Precio,
    ]);
    res.status(200).json({ message: "Funcion creada con exito" });
  } catch (error) {
    res.status(500).json({ message: error.sqlMessage });
  }
};
