import { Col, Container, Row } from "react-bootstrap";
import Footer from "./footer";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <div>
        <Container>
          <Row>
            <Col md={10} className="mx-auto" style={{ background: "#E5F5E0" }}>
              <p>Siamo nell'Edit Profile</p>
              <p>{user.completeName}</p>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </>
  );
};
export default EditProfile;
