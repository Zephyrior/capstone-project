import { useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Dropdown, Form, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addBulletinCommentsAction, fetchBulletinCommentsAction, fetchBulletinPostsAction, toggleAdore } from "../redux/actions";
import { Heart, HeartFill, Star, Stars, ThreeDots } from "react-bootstrap-icons";

const CommentAndLikeSection = ({ postId }) => {
  const user = useSelector((state) => state.user);
  const rawComments = useSelector((state) => state.bulletinComments.bulletinCommentsByPostId[postId]);
  const bulletinComments = useMemo(() => rawComments || [], [rawComments]);
  //const comments = bulletinComments || [];
  console.log("comments log FE: ", bulletinComments);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const hide = location.pathname === "/profile";
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const post = useSelector((state) => state.bulletinPosts.bulletinPosts.content.find((p) => p.id === postId));

  const likedByCurrentUser = post?.likedByUser;

  const toggleAdoreButton = async () => {
    await dispatch(toggleAdore(postId));
    dispatch(fetchBulletinPostsAction());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(addBulletinCommentsAction(comment, postId));
    dispatch(fetchBulletinCommentsAction(postId));
    dispatch(fetchBulletinPostsAction());
    setComment("");
  };

  useEffect(() => {
    dispatch(fetchBulletinCommentsAction(postId));
  }, [dispatch, postId]);
  return (
    <>
      <div>
        <hr />
        <Container fluid>
          <Row>
            <div className="d-flex justify-content-center w-100 gap-2">
              <Button variant="Light" size="sm" style={{ textDecoration: "none", color: "black" }} className="flex-fill" onClick={toggleAdoreButton}>
                {likedByCurrentUser ? (
                  <div>
                    <Stars style={{ color: "orange" }} /> <span style={{ fontWeight: "bold", color: "orange" }}>Adored</span>{" "}
                    <Stars style={{ color: "orange" }} />
                  </div>
                ) : (
                  <div>
                    <Stars /> Adore <Stars />
                  </div>
                )}
              </Button>
              <Button
                variant="Light"
                size="sm"
                style={{ textDecoration: "none", color: "black" }}
                className="flex-fill"
                onClick={() => setShowComments(!showComments)}
              >
                View Comments
              </Button>
            </div>
          </Row>
          <Row>
            {showComments && (
              <Col>
                {bulletinComments.length === 0 ? (
                  <div className="">
                    <p className="mt-3 ms-3 mb-1 text-muted" style={{ fontSize: "0.8rem" }}>
                      No comments yet. Say something nice! 💖
                    </p>
                  </div>
                ) : (
                  bulletinComments.map((comment) => (
                    <div key={comment.id} className="border border-1 rounded-3 my-2">
                      <Container fluid>
                        <Row className="mb-2 mt-3">
                          <Col xs={1} className={hide ? "d-none" : ""}>
                            <Image
                              src={comment.authorProfilePictureUrl}
                              roundedCircle
                              style={{ width: "35px", height: "35px", objectFit: "cover" }}
                              className="p-0"
                            />
                          </Col>
                          <Col xl={9} xs={{ span: 8, offset: 1 }} className="ps-0 d-flex align-items-center">
                            <Button variant="link" style={{ fontWeight: "bold", textDecoration: "none", color: "black" }} className="p-0">
                              {comment.authorFullName}
                            </Button>
                            <p style={{ fontSize: "10px" }} className={`mb-0 mt-1 ${hide ? "d-none" : ""}`}>
                              {comment.createdAt ? (
                                <>
                                  - {comment.createdAt.split(" ")[1]} • {comment.createdAt.split(" ")[0]}
                                </>
                              ) : (
                                <>- Just now</>
                              )}
                            </p>
                          </Col>
                          {comment?.authorId && user?.id === comment.authorId ? (
                            <Col xs={1} className="d-flex justify-content-end align-items-end flex-column-reverse">
                              <Dropdown>
                                <Dropdown.Toggle variant="link" style={{ textDecoration: "none", color: "black" }} className="p-0 no-caret">
                                  <ThreeDots />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item as="button" style={{ background: "none" }}>
                                    Edit Comment
                                  </Dropdown.Item>
                                  <Dropdown.Item as="button" style={{ background: "none" }}>
                                    Delete Comment
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>
                          ) : (
                            <Col xs={1}></Col>
                          )}
                        </Row>
                        <Row className="mt-3">
                          <Col>
                            <p className="ms-3"> {comment.content}</p>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  ))
                )}
              </Col>
            )}
          </Row>
          <Row className="mt-4">
            <Col lg={1} className={`${hide ? "d-none" : "px-0 d-none d-lg-block "}`}>
              <Button variant="link" onClick={() => navigate("/profile")} className="p-0 ms-2 me-1">
                <Image src={user.profilePictureUrl} roundedCircle style={{ width: "100%", maxWidth: "35px", height: "auto", objectFit: "cover" }} />
              </Button>
            </Col>
            <Col lg={1} className={`${!hide ? "d-none" : ""}`}></Col>
            <Col xs={12} lg={11} className="ps-1">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicTextArea">
                  <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="Say what you think..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
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
