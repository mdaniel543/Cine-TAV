import { Container, Navbar, Nav } from "react-bootstrap";
import { CgLogOut } from "react-icons/cg";

function Header({ action, link }) {
  const handleLink = (e) => {
    e.preventDefault();
  };

  return (
    <Navbar collapseOnSelect expand="xxl" variant="dark">
      <Container>
        <Navbar.Brand>
          {" "}
          <h3> Cine </h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link
              onClick={handleLink}
              style={{
                fontSize: 20,
                color: "black",
                textDecoration: "none",
              }}
            ></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
