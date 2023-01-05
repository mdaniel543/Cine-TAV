import { ListGroup } from "react-bootstrap";

export default function ListGroupComponent({ items = [], setLista, lista }) {
  return (
    <div
      style={{
        overflowX: "auto",
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
        marginTop: "3rem",
        marginBottom: "3rem",
        width: "59rem",
      }}
    >
      <ListGroup horizontal>
        {items.map((item, index) => (
          <ListGroup.Item
            key={index}
            action
            active={lista.includes(item.idAsiento)}
            onClick={(e) => {
              e.preventDefault();
              if (lista.includes(item.idAsiento)) {
                setLista(lista.filter((id) => id !== item.idAsiento));
              } else {
                setLista([...lista, item.idAsiento]);
              }
            }}
            disabled={item.Ocupado === 2}
            style={{
              cursor: "pointer",
              backgroundColor: item.Ocupado === 2 ? "#FF4B4B" : "#FFE8D2",
              color: item.Ocupado === 2 ? "#000" : "#000",
            }}
          >
            {item.Nombre}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
