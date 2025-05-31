import { Button, Col, Container, Row } from "react-bootstrap";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileBulletin from "./ProfileBulletin";
import CircleList from "./CircleList";
import BulletinBoard from "./BulletinBoard";
import WidgetsPage from "./WidgetsPage";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import CreateBulletin from "./CreateBulletin";
/* import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProfileViewsAction } from "../redux/actions"; */

const ProfilePage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  /*   const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchProfileViewsAction(user.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]); */

  return (
    <>
      <Container fluid>
        {token ? (
          <Row className="mx-auto">
            <Col md={7}>
              <ProfileUserInfo />
              <Container>
                <CreateBulletin />
              </Container>
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
        ) : (
          <p>
            Session expired.{" "}
            <Button as="span" variant="link" style={{ textDecoration: "none", verticalAlign: "baseline" }} className="p-0" onClick={() => navigate("/Login")}>
              Login to continue.
            </Button>
          </p>
        )}
      </Container>
    </>
  );
};

export default ProfilePage;
