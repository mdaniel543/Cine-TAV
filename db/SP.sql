DROP PROCEDURE IF EXISTS `ObtenerCartelera`;
DELIMITER $$
CREATE PROCEDURE `ObtenerCartelera`()
BEGIN
    SELECT * FROM Cartelera;
END$$

DELIMITER ;

-- ---------------------------------------------

DROP PROCEDURE IF EXISTS `ObtenerPeliculas`;
DELIMITER $$
CREATE PROCEDURE `ObtenerPeliculas`()
BEGIN
    SELECT * FROM Pelicula p
    INNER JOIN Clasificacion c ON p.Clasificacion_idClasificacion = c.idClasificacion;
END$$

DELIMITER ;

-- ---------------------------------------------

DROP PROCEDURE IF EXISTS `ObtenerTipo`;
DELIMITER $$
CREATE PROCEDURE `ObtenerTipo`()
BEGIN
    SELECT * FROM Tipo;
END$$

DELIMITER ;

-- ---------------------------------------------

DROP PROCEDURE IF EXISTS `ObtenerSala`;
DELIMITER $$
CREATE PROCEDURE `ObtenerSala`()
BEGIN
    SELECT * FROM Sala;
END$$

DELIMITER ;

-- ---------------------------------------------

DROP PROCEDURE IF EXISTS `CrearFuncion`;
DELIMITER $$
CREATE PROCEDURE `CrearFuncion`(IN Param_idPelicula INT, IN Param_idTipo INT, IN Param_idSala INT, IN Param_idCartelera INT, 
IN Param_HoraInicio VARCHAR(20), IN Param_HoraFin VARCHAR(20), IN Param_PrecioAsiento FLOAT) 
BEGIN 
    DECLARE Existe INT DEFAULT 0;

    SELECT COUNT(*) INTO Existe FROM Funcion f
    WHERE f.Pelicula_idPelicula = Param_idPelicula 
    AND f.Tipo_idTipo = Param_idTipo 
    AND f.Sala_idSala = Param_idSala 
    AND f.Cartelera_idCartelera = Param_idCartelera 
    AND f.HoraInicio = Param_HoraInicio 
    AND f.HoraFin = Param_HoraFin;

    IF Existe = 1 THEN
       SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ya existe una funcion con los mismos datos';
    ELSE
        INSERT INTO Funcion(Pelicula_idPelicula, Tipo_idTipo, Sala_idSala, Cartelera_idCartelera, HoraInicio, HoraFin, PrecioAsiento) 
        VALUES(Param_idPelicula, Param_idTipo, Param_idSala, Param_idCartelera, Param_HoraInicio, Param_HoraFin, Param_PrecioAsiento);

        COMMIT;
    END IF;

END$$


CALL CrearFuncion(1, 1, 1, 1, '12:00:00', '14:00:00', 30);

-- ---------------------------------------------

DROP PROCEDURE IF EXISTS `ObtenerFunciones`;
DELIMITER $$
CREATE PROCEDURE `ObtenerFunciones`(IN idCartelera INT)
BEGIN
    SELECT 
        f.idFuncion, 
        p.Nombre as pel_nom, 
        cl.Grupo as clasi_gru,
        cl.Descripcion as clasi_des, 
        t.Descripcion as tipo_des, 
        s.Nombre as Sala_nom, 
        f.HoraInicio, 
        f.HoraFin, 
        f.PrecioAsiento
    FROM Funcion f
    INNER JOIN Pelicula p ON f.Pelicula_idPelicula = p.idPelicula
    INNER JOIN Clasificacion cl ON p.Clasificacion_idClasificacion = cl.idClasificacion
    INNER JOIN Tipo t ON f.Tipo_idTipo = t.idTipo
    INNER JOIN Sala s ON f.Sala_idSala = s.idSala
    WHERE f.Cartelera_idCartelera = idCartelera;
END$$

DELIMITER ;

-- ---------------------------------------------

DROP PROCEDURE IF EXISTS `ObtenerAsientosByFuncion`;
DELIMITER $$
CREATE PROCEDURE `ObtenerAsientosByFuncion`(IN idFuncion INT)
BEGIN 
    WITH ao AS 
    (
        SELECT Asiento_idAsiento FROM Asiento_Ocupado WHERE Venta_Funcion_idFuncion = idFuncion
    )
    SELECT 
        a.idAsiento,
        a.Nombre,
        CASE WHEN ao.Asiento_idAsiento IS NULL THEN 1 ELSE 2 END AS Ocupado
    FROM Asiento a
    LEFT JOIN ao ON a.idAsiento = ao.Asiento_idAsiento
    WHERE a.Sala_idSala = (SELECT Sala_idSala FROM Funcion f WHERE f.idFuncion = idFuncion);
END$$

DELIMITER ;

-- ---------------------------------------------

DROP PROCEDURE IF EXISTS `RealizarVenta`;
DELIMITER $$
CREATE PROCEDURE `RealizarVenta`(IN idFuncion INT, IN Param_CorreoCliente VARCHAR(50), IN Param_Total FLOAT, IN Asientos VARCHAR(1000))
BEGIN

    DECLARE idVenta INT DEFAULT 0;
    DECLARE i INT DEFAULT 1;
    DECLARE idAsiento INT DEFAULT 0;
    DECLARE Existe INT DEFAULT 0;
    DECLARE asientos VARCHAR(1000) DEFAULT Asientos;

    INSERT INTO Venta(CorreoCliente, Total, Funcion_idFuncion) VALUES(Param_CorreoCliente, Param_Total, idFuncion);

    SET idVenta = LAST_INSERT_ID();

    -- El parametro asientos es un string con los id de los asientos separados por coma, pero se desconoce la cantidad de asientos
    -- por lo que se debe recorrer el string y separar los id de los asientos

    WHILE i <= (LENGTH(asientos) - LENGTH(REPLACE(asientos, ',', '')) + 1) DO
        SET idAsiento = SUBSTRING_INDEX(SUBSTRING_INDEX(asientos, ',', i), ',', -1);

        -- Se verifica que el asiento no este ocupado
        SELECT COUNT(*) INTO Existe FROM Asiento_Ocupado ao WHERE ao.Asiento_idAsiento = idAsiento AND ao.Venta_Funcion_idFuncion = idFuncion;

        IF Existe = 1 THEN
            ROLLBACK;
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Un Asiento ya esta ocupado';
        END IF;

        -- Se inserta el asiento ocupado
        INSERT INTO Asiento_Ocupado(Asiento_idAsiento, Venta_Funcion_idFuncion, Venta_idVenta) VALUES(idAsiento, idFuncion, idVenta);
        SET i = i + 1;
    END WHILE;

    -- Si todo sale bien se hace el commit
    COMMIT;

END$$

DELIMITER ;

-- ---------------------------------------------
