import { Col, Container, Row } from "react-bootstrap";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileBulletin from "./ProfileBulletin";
import CircleList from "./CircleList";
import BulletinBoard from "./BulletinBoard";
import WidgetsPage from "./WidgetsPage";
import Footer from "./footer";

const ProfilePage = () => {
  return (
    <>
      <Container fluid>
        <Row className="mx-auto">
          <Col md={7}>
            <ProfileUserInfo />
            <div className="d-block d-md-none">
              <CircleList />
            </div>
            <ProfileBulletin />
            <div className="d-block d-md-none">
              <Footer />
            </div>
          </Col>
          <Col md={5} lg={{ span: 4, offset: 1 }} className="d-none d-md-block">
            <CircleList />
            <Container className="mb-4">
              <BulletinBoard />
            </Container>
            <WidgetsPage />
            <Footer />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
