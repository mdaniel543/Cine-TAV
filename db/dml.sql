-- DML 

-- -----------------------------------------------------

INSERT INTO Clasificacion (idClasificacion, Grupo, Descripcion) VALUES (1, 'A', 'Todas las edades');

INSERT INTO Clasificacion (idClasificacion, Grupo, Descripcion) VALUES (2, 'B', 'Mayores de 12 años');

INSERT INTO Clasificacion (idClasificacion, Grupo, Descripcion) VALUES (3, 'C', 'Mayores de 16 años');

INSERT INTO Clasificacion (idClasificacion, Grupo, Descripcion) VALUES (4, 'D', 'Mayores de 18 años');

-- -----------------------------------------------------

INSERT INTO Tipo (idTipo, Descripcion) VALUES (1, '2D SUB');

INSERT INTO Tipo (idTipo, Descripcion) VALUES (2, '2D DOB');

INSERT INTO Tipo (idTipo, Descripcion) VALUES (3, '3D SUB');

INSERT INTO Tipo (idTipo, Descripcion) VALUES (4, '3D DOB');

-- -----------------------------------------------------

INSERT INTO Sala (idSala, Nombre) VALUES (1, 'Sala 1');

INSERT INTO Sala (idSala, Nombre) VALUES (2, 'Sala 2');

INSERT INTO Sala (idSala, Nombre) VALUES (3, 'Sala 3');

-- -----------------------------------------------------

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (1, 'A1', 1);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (2, 'A2', 1);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (3, 'A3', 1);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (4, 'A4', 1);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (5, 'A5', 1);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (6, 'A6', 1);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (7, 'B1', 1);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (8, 'B2', 1);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (9, 'B3', 1);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (10, 'B4', 1);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (11, 'A1', 2);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (12, 'A2', 2);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (13, 'A3', 2);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (14, 'B1', 2);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (15, 'B2', 2);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (16, 'B3', 2);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (17, 'C1', 2);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (18, 'C2', 2);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (19, 'C3', 2);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (20, 'A1', 3);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (21, 'A2', 3);

INSERT INTO Asiento (idAsiento, Nombre, Sala_idSala) VALUES (22, 'A3', 3);

-- -----------------------------------------------------

INSERT INTO Pelicula (idPelicula, Nombre, Clasificacion_idClasificacion) VALUES (1, 'La vida de Brian', 1);

INSERT INTO Pelicula (idPelicula, Nombre, Clasificacion_idClasificacion) VALUES (2, 'El club de la lucha', 2);

INSERT INTO Pelicula (idPelicula, Nombre, Clasificacion_idClasificacion) VALUES (3, 'El señor de los anillos', 3);

INSERT INTO Pelicula (idPelicula, Nombre, Clasificacion_idClasificacion) VALUES (4, 'El padrino', 4);

-- -----------------------------------------------------

INSERT INTO Cartelera (idCartelera, Fecha, Lugar) VALUES (1, '2022-01-10', 'Las Americas');

INSERT INTO Cartelera (idCartelera, Fecha, Lugar) VALUES (2, '2022-01-11', 'Las Americas');

INSERT INTO Cartelera (idCartelera, Fecha, Lugar) VALUES (3, '2022-01-10', 'Roosevelt');

INSERT INTO Cartelera (idCartelera, Fecha, Lugar) VALUES (4, '2022-01-11', 'Roosevelt');

-- -----------------------------------------------------
