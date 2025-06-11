import { Container, Image } from "react-bootstrap";

const LoginLogo = () => {
  return (
    <>
      <Container fluid style={{ backgroundColor: "#C7E9C0" }} className="px-0 w-100 vh-100 d-flex justify-content-center align-items-center">
        <Image fluid src="/Circlelogo3.png" alt="Circle Logo" style={{ maxWidth: "70%", maxHeight: "70%" }} className="mb-5" />
      </Container>
    </>
  );
};

export default LoginLogo;
