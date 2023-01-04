-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cine-tav
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cine-tav
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cine-tav` DEFAULT CHARACTER SET utf8 ;
USE `cine-tav` ;

-- -----------------------------------------------------
-- Table `cine-tav`.`Cartelera`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cine-tav`.`Cartelera` (
  `idCartelera` INT NOT NULL,
  `Fecha` DATE NOT NULL,
  `Lugar` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCartelera`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cine-tav`.`Clasificacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cine-tav`.`Clasificacion` (
  `idClasificacion` INT NOT NULL,
  `Grupo` VARCHAR(5) NOT NULL,
  `Descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idClasificacion`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cine-tav`.`Pelicula`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cine-tav`.`Pelicula` (
  `idPelicula` INT NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Clasificacion_idClasificacion` INT NOT NULL,
  PRIMARY KEY (`idPelicula`),
  INDEX `fk_Pelicula_Clasificacion1_idx` (`Clasificacion_idClasificacion` ASC) VISIBLE,
  CONSTRAINT `fk_Pelicula_Clasificacion1`
    FOREIGN KEY (`Clasificacion_idClasificacion`)
    REFERENCES `cine-tav`.`Clasificacion` (`idClasificacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cine-tav`.`Sala`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cine-tav`.`Sala` (
  `idSala` INT NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idSala`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cine-tav`.`Tipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cine-tav`.`Tipo` (
  `idTipo` INT NOT NULL,
  `Descripcion` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idTipo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cine-tav`.`Funcion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cine-tav`.`Funcion` (
  `idFuncion` INT NOT NULL AUTO_INCREMENT,
  `PrecioAsiento` FLOAT NOT NULL,
  `HoraInicio` TIME NOT NULL,
  `HoraFin` TIME NOT NULL,
  `Cartelera_idCartelera` INT NOT NULL,
  `Pelicula_idPelicula` INT NOT NULL,
  `Tipo_idTipo` INT NOT NULL,
  `Sala_idSala` INT NOT NULL,
  INDEX `fk_Funcion_Cartelera1_idx` (`Cartelera_idCartelera` ASC) VISIBLE,
  INDEX `fk_Funcion_Pelicula1_idx` (`Pelicula_idPelicula` ASC) VISIBLE,
  INDEX `fk_Funcion_Tipo1_idx` (`Tipo_idTipo` ASC) VISIBLE,
  PRIMARY KEY (`idFuncion`),
  INDEX `fk_Funcion_Sala1_idx` (`Sala_idSala` ASC) VISIBLE,
  CONSTRAINT `fk_Funcion_Cartelera1`
    FOREIGN KEY (`Cartelera_idCartelera`)
    REFERENCES `cine-tav`.`Cartelera` (`idCartelera`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Funcion_Pelicula1`
    FOREIGN KEY (`Pelicula_idPelicula`)
    REFERENCES `cine-tav`.`Pelicula` (`idPelicula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Funcion_Tipo1`
    FOREIGN KEY (`Tipo_idTipo`)
    REFERENCES `cine-tav`.`Tipo` (`idTipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Funcion_Sala1`
    FOREIGN KEY (`Sala_idSala`)
    REFERENCES `cine-tav`.`Sala` (`idSala`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cine-tav`.`Asiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cine-tav`.`Asiento` (
  `idAsiento` INT NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Sala_idSala` INT NOT NULL,
  PRIMARY KEY (`idAsiento`),
  INDEX `fk_Asiento_Sala1_idx` (`Sala_idSala` ASC) VISIBLE,
  CONSTRAINT `fk_Asiento_Sala1`
    FOREIGN KEY (`Sala_idSala`)
    REFERENCES `cine-tav`.`Sala` (`idSala`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cine-tav`.`Venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cine-tav`.`Venta` (
  `idVenta` INT NOT NULL AUTO_INCREMENT,
  `CorreoCliente` VARCHAR(100) NOT NULL,
  `Total` FLOAT NOT NULL,
  `Funcion_idFuncion` INT NOT NULL,
  PRIMARY KEY (`idVenta`, `Funcion_idFuncion`),
  INDEX `fk_Venta_Funcion1_idx` (`Funcion_idFuncion` ASC) VISIBLE,
  CONSTRAINT `fk_Venta_Funcion1`
    FOREIGN KEY (`Funcion_idFuncion`)
    REFERENCES `cine-tav`.`Funcion` (`idFuncion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cine-tav`.`Asiento_Ocupado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cine-tav`.`Asiento_Ocupado` (
  `Asiento_idAsiento` INT NOT NULL,
  `Venta_idVenta` INT NOT NULL,
  `Venta_Funcion_idFuncion` INT NOT NULL,
  INDEX `fk_Asiento_Funcion_Asiento1_idx` (`Asiento_idAsiento` ASC) VISIBLE,
  INDEX `fk_Asiento_Funcion_Venta1_idx` (`Venta_idVenta` ASC, `Venta_Funcion_idFuncion` ASC) VISIBLE,
  PRIMARY KEY (`Asiento_idAsiento`, `Venta_Funcion_idFuncion`),
  CONSTRAINT `fk_Asiento_Funcion_Asiento1`
    FOREIGN KEY (`Asiento_idAsiento`)
    REFERENCES `cine-tav`.`Asiento` (`idAsiento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Asiento_Funcion_Venta1`
    FOREIGN KEY (`Venta_idVenta` , `Venta_Funcion_idFuncion`)
    REFERENCES `cine-tav`.`Venta` (`idVenta` , `Funcion_idFuncion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
