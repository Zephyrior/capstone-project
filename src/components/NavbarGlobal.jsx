import { Button, Container, Dropdown, Form, Image, InputGroup, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ToggleSearchBar from "./ToggleSearchBar";
import { Search } from "react-bootstrap-icons";
import { useState } from "react";
import { searchUserAction } from "../redux/actions";

function NavbarGlobal() {
  const user = useSelector((state) => state.user);
  console.log("user navbar: ", user);
  const [showLogo, setShowLogo] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(searchUserAction(search));
    setSearch("");
    navigate(`/search/${search}`);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("spotifyPlayListId");
    navigate("/Login");
  };

  const toggleLogo = () => {
    setShowLogo((prev) => !prev);
  };
  return (
    <Navbar expand="lg" style={{ background: "#E5F5E0" }} className="px-3">
      <Container fluid>
        <Navbar.Brand href="/Home" className="d-none d-md-block">
          Circle
        </Navbar.Brand>
        {showLogo && (
          <Navbar.Brand href="/Home" className="d-block d-md-none">
            C
          </Navbar.Brand>
        )}
        <Form className="d-sm-flex d-none align-items-end ms-auto me-5" onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control type="search" placeholder="Search circle" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button type="submit" variant="outline-success">
              <Search />
            </Button>
          </InputGroup>
        </Form>
        <div className="d-flex d-sm-none align-items-end ms-auto">
          <ToggleSearchBar toggleLogo={toggleLogo} />
        </div>
        {token && (
          <Dropdown align="end">
            <Dropdown.Toggle as={Button} className="p-0 bg-transparent border-0 d-none d-sm-block me-2">
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

            <Dropdown.Toggle as={Button} className="p-0 bg-transparent border-0 d-block d-sm-none">
              <Image
                src={user.profilePictureUrl}
                roundedCircle
                style={{
                  width: "100%",
                  maxWidth: "40px",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as="button" style={{ background: "none" }} onClick={() => navigate("/Profile")}>
                View Profile
              </Dropdown.Item>
              <Dropdown.Item as="button" style={{ background: "none" }}>
                Edit Profile
              </Dropdown.Item>
              <Dropdown.Item as="button" style={{ background: "none" }} onClick={() => navigate("/Widgets")} className="d-md-none">
                Your Widgets
              </Dropdown.Item>
              <Dropdown.Item as="button" style={{ background: "none" }} onClick={logOut}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Container>
    </Navbar>
  );
}

export default NavbarGlobal;
