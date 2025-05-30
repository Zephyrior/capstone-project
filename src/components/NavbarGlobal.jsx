import { Button, Container, Dropdown, Form, Image, InputGroup, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ToggleSearchBar from "./ToggleSearchBar";
import { Search } from "react-bootstrap-icons";

function NavbarGlobal() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("spotifyPlayListId");
    navigate("/Login");
  };
  return (
    <Navbar expand="lg" style={{ background: "#E5F5E0" }} className="px-3">
      <Container fluid>
        <Navbar.Brand href="/Home" className="d-none d-md-block">
          Circle
        </Navbar.Brand>
        <Navbar.Brand href="/Home" className="d-block d-md-none">
          C
        </Navbar.Brand>
        <Form className="d-sm-flex d-none align-items-end ms-auto me-5">
          <InputGroup>
            <Form.Control type="search" placeholder="Search circle" aria-label="Search" />
            <Button type="submit" variant="outline-success">
              <Search />
            </Button>
          </InputGroup>
        </Form>

        <div className="d-flex d-sm-none align-items-end ms-auto">
          <ToggleSearchBar />
        </div>

        <Dropdown align="end" className="me-2">
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
            <Dropdown.Item as="button" style={{ background: "none" }} onClick={() => navigate("/Profile")}>
              View Profile
            </Dropdown.Item>
            <Dropdown.Item as="button" style={{ background: "none" }} onClick={() => navigate("/Widgets")} className="d-md-none">
              Your Widgets
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
