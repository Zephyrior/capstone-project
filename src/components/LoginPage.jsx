import { Col, Container, Row } from "react-bootstrap";
import LoginLogo from "./LoginLogo";
import Login from "./LogIn";

const LoginPage = () => {
  return (
    <>
      <Container fluid className="px-0">
        <Row>
          <Col md={6} xl={8} className="d-none d-md-block px-0">
            <LoginLogo />
          </Col>
          <Col md={6} xl={4} className="px-0">
            <Login />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
