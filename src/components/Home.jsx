import { Col, Container, Row } from "react-bootstrap";
import UserInfo from "./UserInfo";
import WidgetsPage from "./WidgetsPage";
import SmallCircle from "./SmallCircle";
import Footer from "./footer";
import CreateBulletin from "./CreateBulletin";
import BulletinBoard from "./BulletinBoard";

const Home = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md={2} className="d-none d-md-block">
            <UserInfo />
            <SmallCircle />
            <Footer />
          </Col>
          <Col md={6} lg={{ offset: 1 }}>
            <CreateBulletin />
            <BulletinBoard />
          </Col>
          <Col md={4} lg={3} className="d-none d-md-block">
            <WidgetsPage />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
