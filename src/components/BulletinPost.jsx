import { Button, Col, Container, Dropdown, Image, Row } from "react-bootstrap";
import { CaretRightFill, ThreeDots } from "react-bootstrap-icons";
import CommentAndLikeSection from "./CommentAndLikeSection";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const BulletinPost = ({ post }) => {
  const location = useLocation();
  const hide = location.pathname === "/profile";
  const userId = useSelector((state) => state.user.id);
  const authorId = post.authorId;

  console.log("Post from bulletin post: ", post);

  return (
    <>
      <div key={post.id} className="border p-3 rounded shadow-sm mb-3 position-relative" style={{ background: "#fff" }}>
        <Container>
          <div className="pin-icon position-absolute" style={{ top: "-20px", right: "-15px", fontSize: "2rem" }}>
            📌
          </div>
          <Row className="mb-4">
            <Col xs={2} className={hide ? "d-none" : ""}>
              <Image src={post.authorProfilePictureUrl} roundedCircle style={{ width: "100%", maxWidth: "70px", height: "auto", objectFit: "cover" }} />
            </Col>
            <Col xs={1} className={!hide ? "d-none" : ""}></Col>
            <Col xs={8} className="ps-0">
              <Button variant="link" style={{ fontWeight: "bold", textDecoration: "none", color: "black" }} className="ps-0 pe-1 py-0">
                {post.authorFullName}
              </Button>{" "}
              {post.profileOwnerFullName && <CaretRightFill />}
              {post.profileOwnerFullName && (
                <Button variant="link" style={{ fontWeight: "bold", textDecoration: "none", color: "black" }} className="ps-2 py-0">
                  {post.profileOwnerFullName}
                </Button>
              )}
              <p style={{ fontSize: "10px" }} className="mb-0">
                {post.createdAt.split(" ")[1]} • {post.createdAt.split(" ")[0]}
              </p>
            </Col>
            {userId === authorId ? (
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
            ) : (
              <div></div>
            )}
          </Row>
          <Row className={`mb-3 ${hide ? "ms-2" : ""}`}>
            <p>{post.content}</p>
            <Image src={post.mediaUrl} style={{ maxWidth: "100%", height: "auto" }} />
          </Row>
          <Row>
            <Col className="d-flex justify-content-start">
              <Button variant="link" style={{ textDecoration: "none", color: "black" }} className="pb-0">
                {post.likesCount} adores
              </Button>
              <Button disabled variant="link" style={{ textDecoration: "none", color: "black" }} className="pb-0 px-0">
                •
              </Button>

              <Button variant="link" style={{ textDecoration: "none", color: "black" }} className="pb-0">
                {post.comments.length} comments
              </Button>
            </Col>
          </Row>
        </Container>
        <CommentAndLikeSection postId={post.id} />
      </div>
    </>
  );
};

export default BulletinPost;
