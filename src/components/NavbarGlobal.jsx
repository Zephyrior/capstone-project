import { Button, Container, Form, Navbar } from "react-bootstrap";

function NavbarGlobal() {
  return (
    <Navbar expand="lg" style={{ background: "#E5F5E0" }} className="px-3">
      <Container fluid>
        <Navbar.Brand href="#">Circle</Navbar.Brand>
        <Form className="d-sm-flex d-none">
          <Form.Control type="search" placeholder="Search circle" className="me-2" aria-label="Search" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavbarGlobal;
