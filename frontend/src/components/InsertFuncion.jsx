import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import {
  useGetPeliculasQuery,
  useGetSalasQuery,
  useGetTipoFuncionesQuery,
  useCreateFuncionMutation,
} from "../app/apis/apiAdmin";
import TableCartelera from "./TableCartelera";

export default function InsertFuncion() {
  const { data: dataPeliculas } = useGetPeliculasQuery();
  const { data: dataSalas } = useGetSalasQuery();
  const { data: dataTipoFunciones } = useGetTipoFuncionesQuery();
  const [createFuncion] = useCreateFuncionMutation();

  const [data, setData] = React.useState({
    idCartelera: 0,
    idPelicula: 0,
    idSala: 0,
    idTipoFuncion: 0,
    HoraInicio: "",
    HoraFin: "",
    Precio: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (
      data.idCartelera === 0 ||
      data.idPelicula === 0 ||
      data.idSala === 0 ||
      data.idTipoFuncion === 0 ||
      data.HoraInicio === "" ||
      data.HoraFin === "" ||
      data.Precio === 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Llena todos los campos",
        background: "#FFE8D2",
      });
    } else {
      await createFuncion(data)
        .unwrap()
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Funcion agregada",
            text: "se ha agregado la funcion correctamente",
            background: "#FFE8D2",
          });
          setData({
            idCartelera: 0,
            idPelicula: 0,
            idSala: 0,
            idTipoFuncion: 0,
            HoraInicio: "",
            HoraFin: "",
            Precio: 0,
          });
        })
        .catch((res) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
            background: "#FFE8D2",
          });
        });
    }
  };

  return (
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Cartelera
        </Form.Label>
        <Col sm="10">
          <div
            style={{
              overflowY: "auto",
              height: "230px",
            }}
          >
            <TableCartelera
              setCartelera={(idCartelera) => setData({ ...data, idCartelera })}
              selectC={data.idCartelera}
            />
          </div>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Peliculas
        </Form.Label>
        <Col sm="10">
          <Form.Select
            aria-label="Default select example"
            style={{ backgroundColor: "#FFE8D2", color: "#000" }}
            value={data.idPelicula}
            onChange={(e) => setData({ ...data, idPelicula: e.target.value })}
          >
            <option value={0}>Selecciona una pelicula</option>
            {dataPeliculas?.map((pelicula) => (
              <option key={pelicula.idPelicula} value={pelicula.idPelicula}>
                {pelicula.Nombre}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Salas
        </Form.Label>
        <Col sm="10">
          <Form.Select
            aria-label="Default select example"
            style={{ backgroundColor: "#FFE8D2", color: "#000" }}
            value={data.idSala}
            onChange={(e) => setData({ ...data, idSala: e.target.value })}
          >
            <option value={0}>Selecciona una sala</option>
            {dataSalas?.map((sala) => (
              <option key={sala.idSala} value={sala.idSala}>
                {sala.Nombre}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Tipo Funcion
        </Form.Label>
        <Col sm="10">
          <Form.Select
            aria-label="Default select example"
            style={{ backgroundColor: "#FFE8D2", color: "#000" }}
            value={data.idTipoFuncion}
            onChange={(e) =>
              setData({ ...data, idTipoFuncion: e.target.value })
            }
          >
            <option value={0}>Selecciona un tipo de funcion</option>
            {dataTipoFunciones?.map((tipoFuncion) => (
              <option key={tipoFuncion.idTipo} value={tipoFuncion.idTipo}>
                {tipoFuncion.Descripcion}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Hora Inicio
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="time"
            placeholder="Hora Inicio"
            style={{ backgroundColor: "#FFE8D2", color: "#000" }}
            value={data.HoraInicio}
            onChange={(e) => setData({ ...data, HoraInicio: e.target.value })}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Hora Fin
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="time"
            placeholder="Hora Fin"
            style={{ backgroundColor: "#FFE8D2", color: "#000" }}
            value={data.HoraFin}
            onChange={(e) => setData({ ...data, HoraFin: e.target.value })}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Precio
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="number"
            placeholder="Precio"
            style={{ backgroundColor: "#FFE8D2", color: "#000" }}
            value={data.Precio}
            onChange={(e) => setData({ ...data, Precio: e.target.value })}
          />
        </Col>
      </Form.Group>

      <div
        style={{
          marginTop: "20px",
          marginBottom: "40px",
          display: "flex",
          justifyContent: "right",
          alignItems: "right",
        }}
      >
        <Button
          style={{
            border: "solid 5px #ff9f46",
            backgroundColor: "#FFE8D2",
            color: "#000",
          }}
          size="lg"
          onClick={(e) => {
            console.log(data);
            handleSubmit(e);
          }}
        >
          Insertar Registro
        </Button>
      </div>
    </Form>
  );
}
