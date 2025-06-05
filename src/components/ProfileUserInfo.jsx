import { useEffect } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchOtherUserAction, fetchProfileViewsAction } from "../redux/actions";
import { useParams } from "react-router-dom";

const ProfileUserInfo = () => {
  const user = useSelector((state) => state.user);
  const otherUser = useSelector((state) => state.otherUser);
  const profileView = useSelector((state) => state.profileViews.profileViews);
  const { id } = useParams();
  console.log("User FE: ", user);
  console.log("redux profileView", profileView);
  console.log("profile view full name", profileView.viewerFullName);

  const dispatch = useDispatch();

  const isViewingOwnProfile = id === String(user.id);

  const profile = !id || isViewingOwnProfile ? user : otherUser;

  useEffect(() => {
    if (id) {
      dispatch(fetchOtherUserAction(id));
    } else if (user.id) {
      dispatch(fetchProfileViewsAction(user.id));
    }
  }, [dispatch, id, user.id]);

  return (
    <>
      <Container>
        {user ? (
          <div className="border border-1 rounded-3 p-3 mb-4" style={{ background: "#E5F5E0" }}>
            <Row>
              <Col xs={12} md={6} className="mb-2">
                <div className="position-relative">
                  <div className="pin-icon position-absolute" style={{ top: "-20px", right: "1px", fontSize: "2.5rem" }}>
                    📍
                  </div>
                  <div className="pin-icon position-absolute" style={{ bottom: "-30px", left: "-10px", fontSize: "3rem" }}>
                    📎
                  </div>
                  <Image fluid style={{ objectFit: "cover", width: "100%", height: "auto" }} src={profile.profilePictureUrl} />
                </div>
                <div className="border p-3 rounded shadow-sm mb-1 mt-3 d-lg-none d-xs-flex justify-content-between" style={{ background: "#fff" }}>
                  {profile.shoutOut ? profile.shoutOut : "Speak your mind! 💭"}
                  <Button variant="link" className="text-muted" style={{ fontSize: "0.7rem", textDecoration: "none" }}>
                    [Edit]
                  </Button>
                </div>
                {isViewingOwnProfile && (
                  <div className="d-flex justify-content-center mt-3 w-100 gap-2">
                    <Button variant="outline-success" className="flex-fill">
                      Edit profile
                    </Button>
                    <Button variant="outline-success" className="flex-fill">
                      Profile views
                    </Button>
                  </div>
                )}
              </Col>
              <Col xs={12} md={6}>
                <div className="border p-3 rounded shadow-sm mb-1 d-none d-lg-flex justify-content-between" style={{ background: "#fff" }}>
                  {profile.shoutOut ? profile.shoutOut : "Speak your mind! 💭"}
                  <Button variant="link" className="text-muted" style={{ fontSize: "0.7rem", textDecoration: "none" }}>
                    [Edit]
                  </Button>
                </div>
                <div className="p-3">
                  <h4 className="mb-3 mt-2">
                    {profile.completeName}{" "}
                    {profile.nickName && (
                      <span className="text-muted" style={{ fontSize: "1rem" }}>
                        aka {profile.nickName}
                      </span>
                    )}
                  </h4>
                  {profile.location && (
                    <p className="mb-2">
                      {" "}
                      <span style={{ fontWeight: "bold" }}>📍 Location:</span> {profile.location}
                    </p>
                  )}
                  {profile.hobby && (
                    <p className="mb-2">
                      {" "}
                      <span style={{ fontWeight: "bold" }}>⛹ Hobbies:</span> {profile.location}
                    </p>
                  )}
                  <p className="mb-2">
                    {" "}
                    <span style={{ fontWeight: "bold" }}>📆 Member since:</span> {profile.createdAt}
                  </p>
                  <p className="mb-2">
                    <span style={{ fontWeight: "bold" }}>🥰 Profile viewed:</span>{" "}
                    {profileView.length === 0 ? "You have no views" : `${profileView.length} times`}
                  </p>
                  <p className="mb-2">
                    <span style={{ fontWeight: "bold" }}>🌱 Bio:</span>
                    <br />
                  </p>
                  <div className=" border p-3 rounded shadow-sm ms-4" style={{ background: "#fff" }}>
                    {profile.bio ? profile.bio : "Tell something about yourself."}
                  </div>
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
