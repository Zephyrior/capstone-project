import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCirclesAction, fetchOthersCircle } from "../redux/actions";
import { useParams } from "react-router-dom";

const CircleList = () => {
  const user = useSelector((state) => state.user);
  const otherUser = useSelector((state) => state.otherUser);
  const dispatch = useDispatch();
  const myCircles = useSelector((state) => state.myCircles.myCircles);
  const othersCircle = useSelector((state) => state.othersCircle.othersCircle);
  console.log("myCircles FE: ", myCircles);

  const { id } = useParams();

  const isViewingOwnProfile = id === String(user.id);

  const profile = !id || isViewingOwnProfile ? user : otherUser;

  const circles = profile ? othersCircle || [] : myCircles || [];

  useEffect(() => {
    if (id) {
      dispatch(fetchOthersCircle(id));
    } else {
      dispatch(fetchMyCirclesAction());
    }
  }, [dispatch, id]);

  return (
    <>
      <Container>
        <div className="border border-1 rounded-3 p-3 mb-4" style={{ background: "#E5F5E0" }}>
          <h5>Circles</h5>
          {circles.length > 0 ? (
            circles.map((circle) => (
              <div key={circle.id}>
                <Container fluid>
                  <Row>
                    <Col xs={4}>
                      <Image src={circle.circle.profilePictureUrl} />
                    </Col>
                    <Col xs={8}>
                      <p>
                        {circle.circle.firstName} {circle.circle.lastName}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </div>
            ))
          ) : (
            <p>You don't have anyone in your circle. 😔</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default CircleList;
