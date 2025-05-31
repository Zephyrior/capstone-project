import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCirclesAction } from "../redux/actions";

const CircleList = () => {
  const dispatch = useDispatch();
  const myCircles = useSelector((state) => state.myCircles.myCircles);
  console.log("myCircles: ", myCircles);

  useEffect(() => {
    dispatch(fetchMyCirclesAction());
  }, [dispatch]);

  return (
    <>
      <Container>
        <div className="border border-1 rounded-3 p-3 mb-4" style={{ background: "#E5F5E0" }}>
          <h5>Circles</h5>
          {myCircles.length > 0 ? (
            myCircles.map((myCircle) => (
              <div key={myCircle.id}>
                <Container fluid>
                  <Row>
                    <Col xs={4}>
                      <Image src={myCircle.circle.profilePictureUrl} />
                    </Col>
                    <Col xs={8}>
                      <p>
                        {myCircle.circle.firstName} {myCircle.circle.lastName}
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
