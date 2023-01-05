import { Table, Spinner, OverlayTrigger, Tooltip } from "react-bootstrap";

function Tablefuncion({ data, setfuncion, selectC, isFetching }) {
  const style = {
    top: 0,
    left: 0,
    zIndex: 10,
    height: "2rem",
    position: "sticky",
    color: "#ffff",
    backgroundColor: "#ff993a91",
  };

  return (
    <>
      {isFetching ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={style}>Nombre</th>
              <th style={style}>Clasificacion</th>
              <th style={style}>Tipo de Funcion</th>
              <th style={style}>Precio</th>
              <th style={style}>Hora Inicio</th>
            </tr>
          </thead>
          <tbody>
            {data.map((funcion) => (
              <tr
                key={funcion.idFuncion}
                onClick={() => setfuncion(funcion.idFuncion)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    funcion.idFuncion === selectC ? "#ff9f46" : "#FFE8D2",
                }}
              >
                <td>{funcion.pel_nom}</td>
                <td>
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        {funcion.clasi_des}
                      </Tooltip>
                    }
                  >
                    <span className="ms-1"
                        style={{
                            backgroundColor: "#ffff",
                            borderRadius: "50%",
                            width: "1.5rem",
                            height: "1.5rem",
                            textAlign: "center",
                            display: "inline-block",
                            verticalAlign: "middle",
                            lineHeight: "1.5rem",
                        }}

                    >{funcion.clasi_gru}</span>
                  </OverlayTrigger>
                </td>
                <td>{funcion.tipo_des}</td>
                <td>{funcion.PrecioAsiento}</td>
                <td>{funcion.HoraInicio}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default Tablefuncion;
