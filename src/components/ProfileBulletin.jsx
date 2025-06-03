import { useState } from "react";
import { Button, ButtonGroup, Col, Container, Dropdown, Image, Row, ToggleButton } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentAndLikeSection from "./CommentAndLikeSection";
import { ThreeDots } from "react-bootstrap-icons";

const ProfileBulletin = () => {
  const [radioValue, setRadioValue] = useState("1");
  const bulletinPosts = useSelector((state) => state.bulletinPosts.bulletinPosts);
  const posts = bulletinPosts?.content || [];
  const user = useSelector((state) => state.user);
  const otherUser = useSelector((state) => state.otherUser);
  const { id } = useParams();
  const isViewingOwnProfile = id === String(user.id);

  const profile = !id || isViewingOwnProfile ? user : otherUser;
  //const isOwnProfile = !id;

  const radios = [
    {
      name: isViewingOwnProfile ? "Your Bulletin" : `${profile?.completeName?.split(" ")[0]}'s Bulletin`,
      value: "1",
    },
    {
      name: isViewingOwnProfile ? "Your Testimonies" : `${profile?.completeName?.split(" ")[0]}'s Testimonies`,
      value: "2",
    },
  ];

  const filteredPosts =
    radioValue === "1"
      ? posts.filter((post) => post.authorId === profile?.id)
      : posts.filter((post) => post.authorId !== profile?.id && post.profileOwnerId === profile?.id);
  return (
    <>
      <Container>
        <div className="border border-1 rounded-3 p-3" style={{ background: "#E5F5E0" }}>
          <ButtonGroup className="w-100">
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={"outline-success"}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
                className="flex-fill"
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>

          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="border p-3 rounded shadow-sm my-3 position-relative" style={{ background: "#fff" }}>
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
                    {user.id === post.authorId ? (
                      <Col xs={2} className="d-flex justify-content-end align-items-end flex-column-reverse">
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
                  <Row className={`mb-3`}>
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
            ))
          ) : (
            <div className="border  rounded shadow-sm my-3 position-relative" style={{ background: "#fff" }}>
              <p className="text-center mt-3">No posts to display.</p>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};
export default ProfileBulletin;
