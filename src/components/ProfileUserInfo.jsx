import { useEffect } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileViewsAction } from "../redux/actions";

const ProfileUserInfo = () => {
  const user = useSelector((state) => state.user);
  const profileView = useSelector((state) => state.profileViews.profileViews);
  console.log("redux profileView", profileView);
  console.log("profile view full name", profileView.viewerFullName);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) {
      dispatch(fetchProfileViewsAction(user.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);
  return (
    <>
      <Container>
        {user ? (
          <div className="border border-1 rounded-3 p-3 mb-4" style={{ background: "#E5F5E0" }}>
            <Row>
              <Col xs={12} md={6} className="mb-2">
                <Image fluid style={{ objectFit: "cover", width: "100%", height: "auto" }} src={user.profilePictureUrl} />
                <div className="d-flex justify-content-center mt-3 w-100 gap-2">
                  <Button variant="outline-success" className="flex-fill">
                    Edit profile
                  </Button>
                  <Button variant="outline-success" className="flex-fill">
                    Profile views
                  </Button>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="border p-3 rounded shadow-sm mb-1" style={{ background: "#fff" }}>
                  {user.shoutOut ? user.shoutOut : "Speak your mind!"}
                </div>
                <div className="p-3">
                  <h5>{user.completeName}</h5>
                  <p className="mb-2">
                    {" "}
                    <span style={{ textDecoration: "underline" }}>Member since:</span> {user.createdAt}
                  </p>
                  <p className="mb-2">
                    <span style={{ textDecoration: "underline" }}>Profile viewed:</span>{" "}
                    {profileView.length === 0 ? "You have no views" : `${profileView.length} times`}
                  </p>
                  <p className="mb-2">
                    <span style={{ textDecoration: "underline" }}>Bio:</span>
                    <br />
                    <span className="ms-2">{user.bio ? user.bio : "Tell us something about yourself."}</span>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <p>user not available</p>
        )}
      </Container>
    </>
  );
};

export default ProfileUserInfo;
