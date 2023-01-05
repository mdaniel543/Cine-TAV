import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import {
  useGetFuncionesQuery,
  useGetAsientosbyFuncionQuery,
  useRealizarVentaMutation,
} from "../app/apis/apiCliente";
import TableCartelera from "./TableCartelera";
import Tablefuncion from "./TableFuncion";
import ListGroupComponent from "./Asientos";

export default function Venta() {
  const [idCartelera, setIdCartelera] = React.useState(0);
  const [createVenta] = useRealizarVentaMutation();
  const [data, setData] = React.useState({
    idFuncion: 0,
    correo: "",
    asientos: [],
  });
  const { data: dataFunciones, isFetching: fetchFunciones } =
    useGetFuncionesQuery(idCartelera);
  const { data: dataAsientos = [] } = useGetAsientosbyFuncionQuery(
    data.idFuncion
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const total =
      data.asientos.length *
      dataFunciones.filter((funcion) => funcion.idFuncion === data.idFuncion)[0]
        .PrecioAsiento;
    console.log(total);
    Swal.fire({
      title: "¿Estas seguro de realizar la compra?",
      text: `El total a pagar es de ${total}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, comprar",
      background: "#FFE8D2",
    }).then((result) => {
      if (result.isConfirmed) {
        createVenta({
            ...data,
            total,
        })
          .unwrap()
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Compra realizada",
              text: "se ha realizado la compra correctamente",
              background: "#FFE8D2",
            });
            setData({
              idFuncion: 0,
              correo: "",
              asientos: [],
            });
            setIdCartelera(0);
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.data.message,
              background: "#FFE8D2",
            });
          });
      }
    });
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
              setCartelera={(idCartelera) => {
                setIdCartelera(idCartelera);
                setData({ ...data, idFuncion: 0, asientos: [] });
              }}
              selectC={idCartelera}
            />
          </div>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Funcion
        </Form.Label>
        <Col sm="10">
          <div
            style={{
              overflowY: "auto",
              height: "230px",
            }}
          >
            <Tablefuncion
              data={dataFunciones}
              setfuncion={(idFuncion) => {
                setData({ ...data, idFuncion: idFuncion, asientos: [] });
              }}
              selectC={data.idFuncion}
              isFetching={fetchFunciones}
            />
          </div>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Asientos
        </Form.Label>
        <Col sm="10">
          <ListGroupComponent
            items={dataAsientos}
            setLista={(lista) => setData({ ...data, asientos: lista })}
            lista={data.asientos}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Correo
        </Form.Label>
        <Col sm="10">
          <Form.Control
            style={{
              backgroundColor: "#FFE8D2",
              color: "#000",
            }}
            type="email"
            placeholder="Correo"
            value={data?.correo}
            onChange={(e) => {
              setData({ ...data, correo: e.target.value });
            }}
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
            handleSubmit(e);
          }}
        >
          Realizar Compra
        </Button>
      </div>
    </Form>
  );
}
