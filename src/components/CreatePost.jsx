import { Component } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className="border border-1 rounded-3 p-3 mb-4" style={{ background: "#E5F5E0" }}>
        <Container fluid>
          <Row>
            <Col xs={1} className="px-0">
              <Button variant="link" className="p-0">
                <Image src={user.profilePictureUrl} roundedCircle style={{ width: "100%", maxWidth: "50px", height: "auto", objectFit: "cover" }} />
              </Button>
            </Col>
            <Col xs={11} className="ps-1">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Share something..." />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button variant="outline-success" type="submit" size="sm">
                    Share
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CreatePost;
