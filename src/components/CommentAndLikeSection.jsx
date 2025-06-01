import { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CommentAndLikeSection = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setComment("");
  };
  return (
    <>
      <div>
        <hr />
        <Container fluid>
          <Row>
            <Col lg={1} className="px-0 d-none d-lg-block">
              <Button variant="link" onClick={() => navigate("/Profile")} className="p-0 ms-2 me-1">
                <Image src={user.profilePictureUrl} roundedCircle style={{ width: "100%", maxWidth: "35px", height: "auto", objectFit: "cover" }} />
              </Button>
            </Col>
            <Col xs={12} lg={11} className="ps-1">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicTextArea">
                  <Form.Control as="textarea" rows={1} placeholder="Say what you think..." value={comment} onChange={(e) => setComment(e.target.value)} />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CommentAndLikeSection;
