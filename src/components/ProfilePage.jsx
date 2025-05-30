import { Col, Container, Row } from "react-bootstrap";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileBulletin from "./ProfileBulletin";
import CircleList from "./CircleList";
import BulletinBoard from "./BulletinBoard";
import WidgetsPage from "./WidgetsPage";

const ProfilePage = () => {
  return (
    <>
      <Container>
        <Row className="mx-auto">
          <Col md={7}>
            <ProfileUserInfo />
            <ProfileBulletin />
          </Col>
          <Col md={{ span: 4, offset: 1 }}>
            <CircleList />
            <Container className="mb-4">
              <BulletinBoard />
            </Container>
            <WidgetsPage />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
