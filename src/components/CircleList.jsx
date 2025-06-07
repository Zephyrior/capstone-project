import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCirclesAction, fetchOthersCircle } from "../redux/actions";
import { useNavigate, useParams } from "react-router-dom";

const CircleList = () => {
  const [showAll, setShowAll] = useState(false);
  const user = useSelector((state) => state.user);
  //const otherUser = useSelector((state) => state.otherUser);
  const dispatch = useDispatch();
  const myCircles = useSelector((state) => state.myCircles.myCircles);
  const othersCircle = useSelector((state) => state.othersCircle.othersCircle.othersCircle);
  //const smallCircle = useSelector((state) => state.mySmallCircle.mySmallCircle);
  console.log("myCircles FE: ", myCircles);
  console.log("othersCircle FE: ", othersCircle);
  const navigate = useNavigate();

  const { id } = useParams();

  const isViewingOwnProfile = !id || id === String(user?.id);
  const viewedUserId = isViewingOwnProfile ? String(user?.id) : id;

  //const profile = isViewingOwnProfile ? user : otherUser;

  useEffect(() => {
    if (!user?.id) return;
    if (isViewingOwnProfile) {
      dispatch(fetchMyCirclesAction());
    } else {
      dispatch(fetchOthersCircle(id));
    }
  }, [dispatch, id, user?.id, isViewingOwnProfile]);

  const circles = isViewingOwnProfile ? myCircles || [] : othersCircle || [];

  const displayedCircles = showAll ? circles : circles.slice(0, 6);

  const chunkedCircles = [];
  for (let i = 0; i < displayedCircles.length; i += 3) {
    chunkedCircles.push(displayedCircles.slice(i, i + 3));
  }
  return (
    <>
      <Container>
        <div className="border border-1 rounded-3 p-3 mb-4" style={{ background: "#E5F5E0" }}>
          <h5 className="mb-4">Circles</h5>
          {circles.length > 0 ? (
            <>
              {chunkedCircles.map((row, rowIndex) => (
                <Row key={rowIndex} className="mb-3">
                  {row.map((circle) => {
                    const otherPerson = String(circle.requester.id) === viewedUserId ? circle.receiver : circle.requester;
                    return (
                      <Col key={circle.id} xs={4} className="text-center">
                        <Button variant="link" style={{ textDecoration: "none" }} onClick={() => navigate(`/profile/${otherPerson.id}`)}>
                          {" "}
                          <Image
                            src={otherPerson.profilePictureUrl}
                            className="rounded-4 mb-2"
                            width={80}
                            height={80}
                            style={{ objectFit: "cover" }}
                            alt={`${otherPerson.firstName} ${otherPerson.lastName}`}
                          />
                        </Button>
                        <Button variant="link" style={{ textDecoration: "none", color: "black" }} onClick={() => navigate(`/profile/${otherPerson.id}`)}>
                          <p style={{ fontWeight: "bold" }}>
                            {otherPerson.firstName} {otherPerson.lastName}
                          </p>
                        </Button>
                      </Col>
                    );
                  })}
                </Row>
              ))}
              {!showAll && circles.length > 6 && (
                <div className="text-end">
                  <Button variant="link" style={{ textDecoration: "none", color: "black" }} onClick={() => setShowAll(!showAll)}>
                    View All
                  </Button>
                </div>
              )}
            </>
          ) : (
            <p className="text-muted">You don't have anyone in your circle. 😔</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default CircleList;
