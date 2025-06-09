import { useEffect, useRef } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptCircleAction,
  addCircleAction,
  cancelCircleAction,
  declineCircleAction,
  fetchCircleRelationshipAction,
  fetchOtherUserAction,
  fetchProfileViewsAction,
} from "../redux/actions";
import { useNavigate, useParams } from "react-router-dom";

const ProfileUserInfo = () => {
  const user = useSelector((state) => state.user);
  const otherUser = useSelector((state) => state.otherUser);
  const profileView = useSelector((state) => state.profileViews.profileViews);
  const myCircles = useSelector((state) => state.myCircles.myCircles);
  const { id } = useParams();
  console.log("User FE: ", user);
  console.log("redux profileView", profileView);
  console.log("profile view full name", profileView.viewerFullName);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isViewingOwnProfile = id === String(user.id) || !id;

  const profile = !id || isViewingOwnProfile ? user : otherUser;

  const isUserInMyCircles = (id) => {
    return myCircles?.some((circle) => String(circle.requester.id) === String(id) || String(circle.receiver.id) === String(id));
  };

  const circleRelationships = useSelector((state) => state.circles.relationships);
  const relationship = circleRelationships || [];
  console.log("relationship FE: ", relationship);

  function getRelationshipStatus(relationship, currentUserId) {
    if (!relationship || relationship === "") {
      return "Add Circle";
    }

    const status = relationship.status;

    if (status === "PENDING") {
      if (relationship.requester.id === currentUserId) {
        return "Cancel Request";
      } else if (relationship.receiver.id === currentUserId) {
        return "Respond to request";
      }
    }

    if (status === "ACCEPTED") {
      return "Friends";
    }

    return "Add Friend";
  }

  const fetchedRelationships = useRef(new Set());

  const handleCircleAction = async (status, otherUser, circle) => {
    switch (status) {
      case "Add Circle":
        await dispatch(addCircleAction(otherUser.id));
        break;
      case "Cancel Request":
        await dispatch(cancelCircleAction(circle.id));
        break;
      case "Decline Request":
        await dispatch(declineCircleAction(circle.id));
        break;
      case "Accept Request":
        await dispatch(acceptCircleAction(circle.id));
        break;
      default:
        break;
    }
    await dispatch(fetchCircleRelationshipAction(user.id, otherUser.id));
    const latestRelationship = circleRelationships[`${user.id}_${otherUser.id}`];
    console.log("Updated relationship after action:", latestRelationship);
  };

  const relationshipKey = `${user.id}_${otherUser.id}`;
  const relation = circleRelationships[relationshipKey];
  const relationshipStatus = getRelationshipStatus(relation, user.id);

  useEffect(() => {
    if (id) {
      dispatch(fetchOtherUserAction(id));
    } else if (user.id) {
      dispatch(fetchProfileViewsAction(user.id));
    }
  }, [dispatch, id, user.id]);

  useEffect(() => {
    if (!isViewingOwnProfile && id && user.id && !fetchedRelationships.current.has(`${user.id}_${id}`)) {
      dispatch(fetchCircleRelationshipAction(user.id, id));
      fetchedRelationships.current.add(`${user.id}_${id}`);
    }
  }, [dispatch, id, isViewingOwnProfile, user.id]);

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
                {isViewingOwnProfile ? (
                  <div className="d-flex justify-content-center mt-3 w-100 gap-2">
                    <Button variant="outline-success" className="flex-fill" onClick={() => navigate("/editprofile")}>
                      Edit profile
                    </Button>
                    <Button variant="outline-success" className="flex-fill">
                      Profile views
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center mt-3 w-100 gap-2">
                    {isUserInMyCircles ? (
                      <>
                        {relationshipStatus === "Add Circle" && (
                          <>
                            <Button variant="outline-success" className="flex-fill" onClick={() => handleCircleAction("Add Circle", otherUser, relation)}>
                              Add Circle
                            </Button>
                            <Button variant="outline-success" className="flex-fill">
                              Profile views
                            </Button>
                          </>
                        )}
                        {relationshipStatus === "Cancel Request" && (
                          <>
                            <Button variant="danger" className="flex-fill" size="sm" onClick={() => handleCircleAction("Cancel Request", otherUser, relation)}>
                              Cancel Request
                            </Button>
                            <Button variant="outline-success" size="sm" className="flex-fill">
                              Profile views
                            </Button>
                          </>
                        )}
                        {relationshipStatus === "Respond to request" && (
                          <>
                            <Button variant="warning" className="flex-fill" size="sm" onClick={() => handleCircleAction("Accept Request", otherUser, relation)}>
                              Respond Request
                            </Button>
                            <Button variant="outline-success" size="sm" className="flex-fill">
                              Profile views
                            </Button>
                          </>
                        )}
                        {relationshipStatus === "Friends" && (
                          <>
                            {" "}
                            <Button variant="success" className="flex-fill">
                              Friends
                            </Button>{" "}
                            <Button variant="outline-success" className="flex-fill">
                              Profile views
                            </Button>
                          </>
                        )}
                      </>
                    ) : (
                      <div> </div>
                    )}
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
                      <span style={{ fontWeight: "bold" }}>⛹ Hobbies:</span> {profile.hobby}
                    </p>
                  )}
                  <p className="mb-2">
                    {" "}
                    <span style={{ fontWeight: "bold" }}>📆 Member since:</span>{" "}
                    {profile.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Unknown"}
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
