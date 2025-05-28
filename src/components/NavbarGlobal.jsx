import { Button, Container, Dropdown, Form, Image, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NavbarGlobal() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Navbar expand="lg" style={{ background: "#E5F5E0" }} className="px-3">
      <Container fluid>
        <Navbar.Brand href="#">Circle</Navbar.Brand>
        <Form className="d-sm-flex d-none">
          <Form.Control type="search" placeholder="Search circle" className="me-2" aria-label="Search" />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Dropdown align="end">
          <Dropdown.Toggle as={Button} className="p-0 bg-transparent border-0">
            <Image
              src={user.profilePictureUrl}
              roundedCircle
              style={{
                width: "100%",
                maxWidth: "50px",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as="button" style={{ background: "none" }}>
              View Profile
            </Dropdown.Item>
            <Dropdown.Item as="button" style={{ background: "none" }} onClick={logOut}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}

export default NavbarGlobal;
