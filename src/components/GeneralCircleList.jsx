import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const GeneralCircleList = () => {
  const searchedUsers = useSelector((state) => state.searchUser.searchUser);
  const users = searchedUsers || [];
  console.log("SearchedUsers FE: ", searchedUsers);

  const { name } = useParams();
  return (
    <>
      <div>
        <Container>
          <Row>
            <Col xs={8} className="mx-auto" style={{ background: "#E5F5E0" }}>
              <div className="rounded-3 p-3">
                <h3 className="mb-4">
                  Search results for <b>{name}</b>
                </h3>
                {users.length === 0 ? (
                  <p>Unfortunately, {name} is not here. 😢</p>
                ) : (
                  users.map((user) => (
                    <div key={user.id} className="border p-3 rounded shadow-sm mb-3 position-relative" style={{ background: "#fff" }}>
                      <Container fluid>
                        <div className="pin-icon position-absolute" style={{ top: "-20px", right: "-15px", fontSize: "2.5rem" }}>
                          📎
                        </div>
                        <div className="pin-icon position-absolute" style={{ bottom: "-20px", left: "-15px", fontSize: "2rem" }}>
                          📎
                        </div>
                        <Row>
                          <Col xs={6} lg={2}>
                            <Image
                              src={user.profilePictureUrl}
                              className="rounded-4"
                              width={64}
                              height={64}
                              style={{ objectFit: "cover" }}
                              alt={user.completeName}
                            />
                          </Col>
                          <Col xs={6} lg={7}>
                            <Button variant="link" style={{ textDecoration: "none", color: "black", fontWeight: "bold" }} className="p-0">
                              {user.completeName}
                            </Button>
                            <p className="text-muted fw-light">member since: {user.createdAt}</p>
                          </Col>
                          <Col lg={3} className="d-flex align-items-center">
                            <Button variant="outline-success">Add Circle</Button>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  ))
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default GeneralCircleList;
