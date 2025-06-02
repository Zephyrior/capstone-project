import { Col, Container, Image, Row } from "react-bootstrap";
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
              <div className="border border-1 rounded-3 p-3">
                <h3 className="mb-4">
                  Search results for <b>{name}</b>
                </h3>
                {users.length === 0 ? (
                  <p>Unfortunately, {name} is not here. 😢</p>
                ) : (
                  users.map((user) => (
                    <div key={user.id} className="border p-3 rounded shadow-sm mb-3 position-relative" style={{ background: "#fff" }}>
                      <Image src={user.profilePictureUrl} className="rounded-4" />
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
