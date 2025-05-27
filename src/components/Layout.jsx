import { Outlet } from "react-router-dom";
import NavbarGlobal from "./NavbarGlobal";
import { Container } from "react-bootstrap";

function Layout() {
  return (
    <>
      <NavbarGlobal />
      <Container fluid className="px-0 mt-3">
        <Outlet />
      </Container>
    </>
  );
}
export default Layout;
