import { Col, Container, Row } from "react-bootstrap";
import UserInfo from "./UserInfo";
import PostsPage from "./PostsPage";
import WidgetsPage from "./WidgetsPage";
import CreatePost from "./CreatePost";
import SmallCircle from "./SmallCircle";

const Home = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md={2} className="d-none d-md-block">
            <UserInfo />
            <SmallCircle />
          </Col>
          <Col md={6} lg={{ offset: 1 }}>
            <CreatePost />
            <PostsPage />
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
