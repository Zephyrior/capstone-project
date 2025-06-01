import { useEffect } from "react";
import { PinAngle, ThreeDots } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchBulletinPostsAction } from "../redux/actions";
import { Button, Col, Container, Dropdown, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CommentAndLikeSection from "./CommentAndLikeSection";

const BulletinBoard = () => {
  const dispatch = useDispatch();
  const bulletinPosts = useSelector((state) => state.bulletinPosts.bulletinPosts);
  const posts = bulletinPosts?.content || [];
  console.log("posts: ", posts);

  useEffect(() => {
    dispatch(fetchBulletinPostsAction());
  }, [dispatch]);

  return (
    <>
      <div className="border border-1 rounded-3 p-3" style={{ background: "#E5F5E0" }}>
        <h3 className="mb-4">Your Bulletin Board 📌</h3>
        {posts.length === 0 ? (
          <p>No posts yet. 😢</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border p-3 rounded shadow-sm mb-3 position-relative" style={{ background: "#fff" }}>
              <Container>
                <div className="pin-icon position-absolute" style={{ top: "-20px", right: "-15px", fontSize: "2rem" }}>
                  📌
                </div>
                <Row className="mb-4">
                  <Col xs={2}>
                    <Image src={post.authorProfilePictureUrl} roundedCircle style={{ width: "100%", maxWidth: "70px", height: "auto", objectFit: "cover" }} />
                  </Col>
                  <Col xs={8} className="ps-0">
                    <Button variant="link" style={{ fontWeight: "bold", textDecoration: "none", color: "black" }} className="ps-0 py-0">
                      {post.authorFullName}
                    </Button>
                    <p style={{ fontSize: "10px" }} className="mb-0">
                      {post.createdAt.split(" ")[1]} • {post.createdAt.split(" ")[0]}
                    </p>
                  </Col>
                  <Col xs={2} className="d-flex justify-content-end align-items-end flex-column-reverse">
                    {/*                     <Button variant="link" style={{ textDecoration: "none", color: "black" }} className="p-0">
                      <ThreeDots />
                    </Button> */}
                    <Dropdown>
                      <Dropdown.Toggle variant="link" style={{ textDecoration: "none", color: "black" }} className="p-0 no-caret">
                        <ThreeDots />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item as="button" style={{ background: "none" }}>
                          Edit Post
                        </Dropdown.Item>
                        <Dropdown.Item as="button" style={{ background: "none" }}>
                          Delete Post
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <p>{post.content}</p>
                  <Image src={post.mediaUrl} style={{ maxWidth: "100%", height: "auto" }} />
                </Row>
              </Container>
              <CommentAndLikeSection />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default BulletinBoard;
