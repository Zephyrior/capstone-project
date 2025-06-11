import { Button, Container, Dropdown, Form, Image, InputGroup, Navbar, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ToggleSearchBar from "./ToggleSearchBar";
import { Search } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { fetchUserAction, searchUserAction } from "../redux/actions";

function NavbarGlobal() {
  const user = useSelector((state) => state.user);
  console.log("user navbar: ", user);
  const [showLogo, setShowLogo] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const location = useLocation();
  const isProfilePage = location.pathname.startsWith("/profile");
  //const params = useParams();
  //const isVisitingOtherProfile = params.userId && params.userId !== user.id;
  const isEditProfilePage = location.pathname.includes("/editprofile");
  const isWidgetPage = location.pathname.includes("/widgets");
  const isHomePage = location.pathname.includes("/home");

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
    navigate("/");
  };

  const toggleLogo = () => {
    setShowLogo((prev) => !prev);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(fetchUserAction());
  }, [dispatch]);
  return (
    <Navbar expand="lg" style={{ background: "#E5F5E0" }} className="px-3">
      <Container fluid>
        <Navbar.Brand onClick={() => navigate("/home")} className="d-none d-md-block" style={{ cursor: "pointer" }}>
          <Image src="/Circlemini.jpg" style={{ width: "100px" }} />
        </Navbar.Brand>
        {showLogo && (
          <Navbar.Brand onClick={() => navigate("/home")} className="d-block d-md-none" style={{ cursor: "pointer" }}>
            <Image src="/Circlemini.jpg" style={{ width: "70px" }} />
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
          <>
            <Dropdown align="end">
              <Dropdown.Toggle
                className="p-0 bg-transparent border-0 d-none d-sm-block me-2"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={user.profilePictureUrl}
                  roundedCircle
                  style={{
                    width: "100%",
                    display: "block",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {!isHomePage && (
                  <Dropdown.Item style={{ background: "none" }} onClick={() => navigate("/home")}>
                    Home
                  </Dropdown.Item>
                )}
                {!isProfilePage && (
                  <Dropdown.Item style={{ background: "none" }} onClick={() => navigate("/profile")}>
                    View Profile
                  </Dropdown.Item>
                )}
                {!isEditProfilePage && (
                  <Dropdown.Item style={{ background: "none" }} onClick={() => navigate("/editprofile")}>
                    Edit Profile
                  </Dropdown.Item>
                )}
                {!isWidgetPage && (
                  <Dropdown.Item style={{ background: "none" }} onClick={() => navigate("/widgets")} className="d-md-none">
                    Your Widgets
                  </Dropdown.Item>
                )}
                <Dropdown.Item style={{ background: "none" }} onClick={logOut}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button
              className="p-0 bg-transparent border-0 d-block d-sm-none"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                overflow: "hidden",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleShow}
            >
              <Image
                src={user.profilePictureUrl}
                roundedCircle
                style={{
                  width: "100%",
                  display: "block",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Button>
          </>
        )}
      </Container>
      <Offcanvas show={show} onHide={handleClose} placement="end" className="ms-5 d-block d-sm-none">
        <Offcanvas.Header closeButton>
          {" "}
          <h3 className="ms-3 mb-1">Circle</h3> <span className="text-muted">—stay closer</span>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ background: "#E5F5E0" }} className="ms-3 mt-4 border border-1 rounded-1 d-flex flex-column h-75">
          <div className="d-flex flex-column justify-content-between flex-grow-1">
            <div>
              <Button
                className="p-0 bg-transparent border-0 ms-3"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  navigate("/profile");
                  handleClose();
                }}
              >
                <Image
                  src={user.profilePictureUrl}
                  roundedCircle
                  style={{
                    width: "100%",
                    display: "block",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </Button>

              <Button
                variant="link"
                className="ms-3 mt-3 mb-3"
                style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
                onClick={() => {
                  navigate("/profile");
                  handleClose();
                }}
              >
                {user.completeName}
              </Button>

              <hr />

              <div className="d-flex flex-column align-items-start">
                {!isHomePage && (
                  <Button
                    variant="link"
                    className="ms-3 mt-3"
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={() => {
                      navigate("/home");
                      handleClose();
                    }}
                  >
                    Home
                  </Button>
                )}
                {!isProfilePage && (
                  <Button
                    variant="link"
                    className="ms-3 mt-3"
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={() => {
                      navigate("/profile");
                      handleClose();
                    }}
                  >
                    View Profile
                  </Button>
                )}
                {!isEditProfilePage && (
                  <Button
                    variant="link"
                    className="ms-3 mt-3"
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={() => {
                      navigate("/editprofile");
                      handleClose();
                    }}
                  >
                    Edit Profile
                  </Button>
                )}
                {!isWidgetPage && (
                  <Button
                    variant="link"
                    className="ms-3 mt-3"
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={() => {
                      navigate("/widgets");
                      handleClose();
                    }}
                  >
                    Your Widgets
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-5">
              <Button variant="link" className="ms-3 mt-3" style={{ textDecoration: "none", color: "black" }} onClick={logOut}>
                Logout
              </Button>
            </div>
          </div>
        </Offcanvas.Body>
        <p className="text-center mt-5 text-muted">Circle @ 2025</p>
      </Offcanvas>
    </Navbar>
  );
}

export default NavbarGlobal;
