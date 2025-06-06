import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { acceptCircleAction, addCircleAction, cancelCircleAction, declineCircleAction, fetchCircleRelationshipAction, searchUserById } from "../redux/actions";
import { useEffect, useRef } from "react";
import Footer from "./Footer";

const GeneralCircleList = () => {
  const currentUser = useSelector((state) => state.user);
  const searchedUsers = useSelector((state) => state.searchUser.searchUser);
  const users = searchedUsers || [];
  console.log("SearchedUsers FE: ", searchedUsers);

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

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = (userId) => {
    dispatch(searchUserById(userId));
    navigate(`/profile/${userId}`);
  };

  const fetchedRelationships = useRef(new Set());

  useEffect(() => {
    searchedUsers.forEach((user) => {
      const key = `${currentUser.id}-${user.id}`;

      console.log("user.id:", user.id);
      console.log("currentUser.id:", currentUser.id);

      if (user.id !== currentUser.id && !fetchedRelationships.current.has(key)) {
        dispatch(fetchCircleRelationshipAction(currentUser.id, user.id));
        fetchedRelationships.current.add(key);
      }
    });
  }, [searchedUsers, currentUser.id, dispatch]);

  const handleCircleAction = async (status, user, circle) => {
    switch (status) {
      case "Add Circle":
        await dispatch(addCircleAction(user.id));
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
    await dispatch(fetchCircleRelationshipAction(currentUser.id, user.id));
    const latestRelationship = circleRelationships[`${currentUser.id}_${user.id}`];
    console.log("Updated relationship after action:", latestRelationship);
  };

  const { name } = useParams();
  return (
    <>
      <div>
        <Container>
          <Row>
            <Col md={8} className="mx-auto" style={{ background: "#E5F5E0" }}>
              <div className="rounded-3 p-3">
                <h3 className="mb-4">
                  Search results for <b>{name}</b>
                </h3>
                {users.length === 0 ? (
                  <p>Unfortunately, {name} is not here. 😢</p>
                ) : (
                  users.map((user) => {
                    const relationshipKey = `${currentUser.id}_${user.id}`;
                    const relationship = circleRelationships[relationshipKey];
                    const relationshipStatus = getRelationshipStatus(relationship, currentUser.id);
                    console.log(`${user.completeName}:`, relationship, relationshipStatus);

                    return (
                      <div key={user.id} className="border p-3 rounded shadow-sm mb-3 position-relative" style={{ background: "#fff" }}>
                        <Container fluid>
                          <div className="pin-icon position-absolute" style={{ top: "-20px", right: "-15px", fontSize: "2.5rem" }}>
                            📎
                          </div>
                          <div className="pin-icon position-absolute" style={{ bottom: "-20px", left: "-15px", fontSize: "2rem" }}>
                            📎
                          </div>
                          <Row className="d-none d-lg-flex">
                            <Col xs={2}>
                              <Button
                                variant="link"
                                style={{ textDecoration: "none" }}
                                onClick={() => {
                                  handleClick(user.id);
                                }}
                              >
                                <Image
                                  src={user.profilePictureUrl}
                                  className="rounded-4"
                                  width={64}
                                  height={64}
                                  style={{ objectFit: "cover" }}
                                  alt={user.completeName}
                                />
                              </Button>
                            </Col>
                            <Col xs={7}>
                              <Button
                                variant="link"
                                style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
                                className="p-0"
                                onClick={() => {
                                  handleClick(user.id);
                                }}
                              >
                                {user.completeName}
                              </Button>
                              <p className="text-muted fw-light">member since: {user.createdAt}</p>
                            </Col>
                            {currentUser.id !== user.id ? (
                              <Col xs={3} className="d-flex align-items-center">
                                {relationshipStatus === "Add Circle" && (
                                  <Button variant="outline-success" onClick={() => handleCircleAction("Add Circle", user, relationship)}>
                                    Add Circle
                                  </Button>
                                )}
                                {relationshipStatus === "Cancel Request" && (
                                  <Button variant="outline-danger" onClick={() => handleCircleAction("Cancel Request", user, relationship)}>
                                    Cancel Request
                                  </Button>
                                )}
                                {relationshipStatus === "Respond to request" && (
                                  <Button variant="outline-warning" onClick={() => handleCircleAction("Accept Request", user, relationship)}>
                                    Respond to request
                                  </Button>
                                )}
                                {relationshipStatus === "Friends" && <Button variant="outline-success">Friends</Button>}
                              </Col>
                            ) : (
                              <div></div>
                            )}
                          </Row>

                          <Row className="d-flex d-lg-none">
                            <Col xs={8} className="">
                              <Image
                                src={user.profilePictureUrl}
                                className="rounded-4"
                                width={64}
                                height={64}
                                style={{ objectFit: "cover" }}
                                alt={user.completeName}
                              />

                              <Button
                                variant="link"
                                style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
                                className="p-0 ms-3"
                                onClick={() => {
                                  handleClick(user.id);
                                }}
                              >
                                {user.completeName}
                              </Button>
                              {currentUser.id === user.id ? (
                                <p className="text-muted fw-light d-none d-lg-block" style={{ fontSize: "15px" }}>
                                  member since: {user.createdAt}
                                </p>
                              ) : (
                                <div></div>
                              )}
                            </Col>
                            {currentUser.id !== user.id ? (
                              <Col xs={4} className="d-flex align-items-center">
                                {relationshipStatus === "Add Circle" && (
                                  <Button variant="outline-success" onClick={() => handleCircleAction("Add Circle", user, relationship)}>
                                    Add Circle
                                  </Button>
                                )}
                                {relationshipStatus === "Cancel Request" && (
                                  <Button variant="outline-danger" onClick={() => handleCircleAction("Cancel Request", user, relationship)}>
                                    Cancel Request
                                  </Button>
                                )}
                                {relationshipStatus === "Respond to request" && (
                                  <Button variant="outline-warning" onClick={() => handleCircleAction("Accept Request", user, relationship)}>
                                    Respond to request
                                  </Button>
                                )}
                                {relationshipStatus === "Friends" && <Button variant="outline-success">Friends</Button>}
                              </Col>
                            ) : (
                              <div></div>
                            )}
                          </Row>
                        </Container>
                      </div>
                    );
                  })
                )}
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default GeneralCircleList;
