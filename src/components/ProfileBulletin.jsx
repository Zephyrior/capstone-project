import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, Dropdown, Image, Modal, Row, ToggleButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommentAndLikeSection from "./CommentAndLikeSection";
import { CaretRightFill, ThreeDots } from "react-bootstrap-icons";
import { deleteBulletinPostAction, fetchBulletinPostsAction, resetBulletinPostsAction } from "../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";

const ProfileBulletin = () => {
  const [radioValue, setRadioValue] = useState("1");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const bulletinPosts = useSelector((state) => state.bulletinPosts.bulletinPosts);
  const posts = bulletinPosts?.content || [];
  const user = useSelector((state) => state.user);
  const otherUser = useSelector((state) => state.otherUser);

  const isViewingOwnProfile = id === String(user.id);
  const viewedUserId = id || user.id;
  const testimonies = bulletinPosts?.content.filter((post) => post.profileOwnerId === Number(viewedUserId)) || [];
  const profile = !id || isViewingOwnProfile ? user : otherUser;

  const [postToDelete, setPostToDelete] = useState(null);

  const [selectedPostForLikes, setSelectedPostForLikes] = useState(null);
  const handleShowLikes = (post) => {
    setSelectedPostForLikes(post);
  };

  const handleCloseLikes = () => {
    setSelectedPostForLikes(null);
  };

  const currentPage = bulletinPosts.number || 0;
  const isLastPage = bulletinPosts.last || false;

  const radios = [
    {
      name: isViewingOwnProfile ? "Your Bulletin" : `${profile?.completeName?.split(" ")[0]}'s Bulletin`,
      value: "1",
    },
    {
      name: isViewingOwnProfile ? "Your Dedications" : `${profile?.completeName?.split(" ")[0]}'s Dedications (${testimonies.length})`,
      value: "2",
    },
  ];

  const filteredPosts =
    radioValue === "1"
      ? posts.filter((post) => post.authorId === profile?.id)
      : posts.filter((post) => post.authorId !== profile?.id && post.profileOwnerId === profile?.id);

  useEffect(() => {
    dispatch(resetBulletinPostsAction());
    dispatch(fetchBulletinPostsAction(0, false, viewedUserId));
  }, [dispatch, viewedUserId, id]);

  const loadMorePosts = () => {
    const nextPage = currentPage + 1;
    dispatch(fetchBulletinPostsAction(nextPage, true));
  };
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
            <InfiniteScroll
              dataLength={filteredPosts.length}
              next={loadMorePosts}
              hasMore={!isLastPage}
              loader={<p className="text-center text-muted mt-3">Loading more posts...</p>}
              endMessage={<p className="text-center text-muted mt-3">No more posts 📭</p>}
              style={{ overflow: "visible" }}
            >
              {filteredPosts.map((post) => (
                <div key={post.id} className="border p-3 rounded shadow-sm my-3 position-relative" style={{ background: "#fff" }}>
                  <Container>
                    <div className="pin-icon position-absolute" style={{ top: "-20px", right: "-15px", fontSize: "2rem" }}>
                      📌
                    </div>
                    <Row className="mb-4">
                      <Col xs={2} xl={1} className="ps-0">
                        <Button
                          className="p-0 bg-transparent border-0 d-none d-lg-block me-2"
                          style={{
                            width: "68px",
                            height: "70px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            src={post.authorProfilePictureUrl}
                            roundedCircle
                            style={{
                              width: "100%",
                              display: "block",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        </Button>
                        <Button
                          className="p-0 bg-transparent border-0 d-block d-lg-none me-2"
                          style={{
                            width: "48px",
                            height: "50px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            src={post.authorProfilePictureUrl}
                            roundedCircle
                            style={{
                              width: "100%",
                              display: "block",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        </Button>
                      </Col>
                      <Col xs={8}>
                        <Button variant="link" style={{ fontWeight: "bold", textDecoration: "none", color: "black" }} className="ps-0 py-0">
                          {post.authorFullName}
                        </Button>
                        {post.profileOwnerFullName && post.authorId === profile?.id && <CaretRightFill />}
                        {post.profileOwnerFullName && post.authorId === profile?.id && (
                          <Button
                            variant="link"
                            style={{ fontWeight: "bold", textDecoration: "none", color: "black" }}
                            className="ps-2 py-0"
                            onClick={() => navigate(`/profile/${post.profileOwnerId}`)}
                          >
                            {post.profileOwnerFullName}
                          </Button>
                        )}
                        <p style={{ fontSize: "10px" }} className="mb-0">
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleString(undefined, {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })
                            : "Just now"}
                        </p>
                      </Col>
                      {user.id === post.authorId ? (
                        <Col xs={2} xl={{ span: 2, offset: 1 }} className="d-flex justify-content-end align-items-end flex-column-reverse">
                          <Dropdown>
                            <Dropdown.Toggle variant="link" style={{ textDecoration: "none", color: "black" }} className="p-0 no-caret">
                              <ThreeDots />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item as="button" style={{ background: "none" }}>
                                Edit Post
                              </Dropdown.Item>
                              <Dropdown.Item as="button" style={{ background: "none" }} onClick={() => setPostToDelete(post.id)}>
                                Delete Post
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          <Modal centered show={postToDelete !== null} onHide={() => setPostToDelete(null)} backdrop="static" keyboard={false}>
                            <Modal.Header style={{ backgroundColor: "#E5F5E0" }} closeButton>
                              <Modal.Title>Delete Post?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ backgroundImage: `url("/circlebg.png")`, backgroundSize: "cover" }}>
                              Are you sure you want to delete your post? Once deleted it will be gone forever. 💔
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={() => setPostToDelete(null)}>
                                Close
                              </Button>
                              <Button
                                variant="outline-success"
                                onClick={() => {
                                  dispatch(deleteBulletinPostAction(postToDelete))
                                    .then(() => setPostToDelete(null))
                                    .catch((error) => console.error("Error deleting post:", error));
                                }}
                              >
                                Delete
                              </Button>
                            </Modal.Footer>
                          </Modal>
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
                      <Col className="d-none d-md-flex justify-content-start">
                        <Button variant="link" style={{ textDecoration: "none", color: "black" }} className="pb-0" onClick={() => handleShowLikes(post)}>
                          {post.likesCount} adores
                        </Button>
                        <Button disabled variant="link" style={{ textDecoration: "none", color: "black" }} className="pb-0 px-0">
                          •
                        </Button>

                        <Button variant="link" style={{ textDecoration: "none", color: "black" }} className="pb-0">
                          {post.comments.length} comments
                        </Button>
                      </Col>
                      <Col className="d-flex d-md-none justify-content-start">
                        <Button
                          variant="link"
                          style={{ textDecoration: "none", color: "black", fontSize: "0.8rem" }}
                          className="pb-0"
                          onClick={() => handleShowLikes(post)}
                        >
                          {post.likesCount} adores
                        </Button>
                        <Button disabled variant="link" style={{ textDecoration: "none", color: "black" }} className="pb-0 px-0">
                          •
                        </Button>

                        <Button variant="link" style={{ textDecoration: "none", color: "black", fontSize: "0.8rem" }} className="pb-0">
                          {post.comments.length} comments
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                  <CommentAndLikeSection postId={post.id} />
                </div>
              ))}
            </InfiniteScroll>
          ) : (
            <div className="border  rounded shadow-sm my-3 position-relative" style={{ background: "#fff" }}>
              <p className="text-center mt-3">No posts to display.</p>
            </div>
          )}
        </div>
      </Container>
      <Modal show={!!selectedPostForLikes} centered onHide={handleCloseLikes}>
        <Modal.Header className="px-3 pb-2 pt-3" style={{ backgroundColor: "#E5F5E0" }} closeButton>
          <h4 className="mb-0 p-0">Adores ✨</h4>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundImage: `url("/circlebg.png")`,
            backgroundSize: "cover",
          }}
        >
          {Array.isArray(selectedPostForLikes?.likes) && selectedPostForLikes.likes.length > 0 ? (
            selectedPostForLikes.likes.map((like) => (
              <div key={like.id} className="flex items-center space-x-2 mb-2">
                <Button variant="link" style={{ textDecoration: "none", padding: 0 }}>
                  <Image src={like.userProfilePictureUrl} alt={like.userFullName} className="rounded-4" width={50} height={50} style={{ objectFit: "cover" }} />
                </Button>
                <Button
                  variant="link"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <span>{like.userFullName}</span>
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 m-2">Be the first to adore 💖</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ProfileBulletin;
