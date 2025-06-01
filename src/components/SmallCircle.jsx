import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchMySmallCircleAction } from "../redux/actions";

const SmallCircle = () => {
  const dispatch = useDispatch();
  const smallCircle = useSelector((state) => state.mySmallCircle.mySmallCircle);
  console.log("my small circle: ", smallCircle);

  useEffect(() => {
    dispatch(fetchMySmallCircleAction());
  }, [dispatch]);
  return (
    <>
      <Container fluid>
        <div className="border border-1 rounded-3 p-2 text-center" style={{ background: "#E5F5E0" }}>
          <p>Small Circle:</p>
          {smallCircle.length > 0 ? (
            smallCircle.map((mySmallCircle) => (
              <div key={mySmallCircle.id}>
                <Container fluid>
                  <Row>
                    <Col xs={4}>
                      <Image src={mySmallCircle.circle.profilePictureUrl} />
                    </Col>
                    <Col xs={8}>
                      <p>
                        {mySmallCircle.circle.firstName} {mySmallCircle.circle.lastName}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </div>
            ))
          ) : (
            <div>
              <p>You have no small circle. 😢</p>
              <Button variant="outline-success" className="border border-0" size="sm">
                Add Small Circle <PlusCircleFill />
              </Button>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default SmallCircle;
