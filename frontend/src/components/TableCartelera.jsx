import { Table, Spinner } from "react-bootstrap";
import Moment from "moment";
import { useGetCartelerasQuery } from "../app/apis/apiCliente";

function TableCartelera({ setCartelera, selectC }) {
  const { data, isFetching } = useGetCartelerasQuery();

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
              <th style={style}>ID</th>
              <th style={style}>Fecha</th>
              <th style={style}>Lugar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cartelera) => (
              <tr
                key={cartelera.idCartelera}
                onClick={() => setCartelera(cartelera.idCartelera)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    cartelera.idCartelera === selectC ? "#ff9f46" : "#FFE8D2",
                }}
              >
                <td>{cartelera.idCartelera}</td>
                <td>{Moment(cartelera.Fecha).format("DD/MM/YYYY")}</td>
                <td>{cartelera.Lugar}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default TableCartelera;
