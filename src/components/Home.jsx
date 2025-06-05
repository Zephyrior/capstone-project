import { Button, Col, Container, Row } from "react-bootstrap";
import UserInfo from "./UserInfo";
import WidgetsPage from "./WidgetsPage";
import SmallCircle from "./SmallCircle";
import Footer from "./Footer";
import CreateBulletin from "./CreateBulletin";
import BulletinBoard from "./BulletinBoard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <>
      <Container fluid>
        {token ? (
          <Row>
            <Col lg={2} className="d-none d-lg-block">
              <UserInfo />
              <SmallCircle />
              <Footer />
            </Col>
            <Col md={8} lg={6} xl={{ offset: 1 }}>
              <CreateBulletin />
              <BulletinBoard />
              <div className="d-block d-lg-none">
                <Footer />
              </div>
            </Col>
            <Col md={4} lg={4} xl={3} className="d-none d-md-block">
              <div className="d-block d-lg-none">
                <UserInfo />
              </div>
              <WidgetsPage />
            </Col>
          </Row>
        ) : (
          <p>
            Session expired.{" "}
            <Button as="span" variant="link" style={{ textDecoration: "none", verticalAlign: "baseline" }} className="p-0" onClick={() => navigate("/")}>
              Login to continue.
            </Button>
          </p>
        )}
      </Container>
    </>
  );
};

export default Home;
