import "./styles/App.css";
import Header from "./components/Header";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import InsertFuncion from "./components/InsertFuncion";
import Venta from "./components/Venta";

function App() {
  return (
    <>
      <Header />
      <div
      style={{marginTop: 50, marginLeft:10, marginRight:20}}
      >
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Admin</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Cliente</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <InsertFuncion />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Venta />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
}

export default App;
