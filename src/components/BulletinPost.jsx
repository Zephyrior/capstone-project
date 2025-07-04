import { Button, Col, Container, Dropdown, Form, FormControl, Image, Modal, Row } from "react-bootstrap";
import { CaretRightFill, ImageFill, ThreeDots } from "react-bootstrap-icons";
import CommentAndLikeSection from "./CommentAndLikeSection";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteBulletinPostAction, editBulletinPostAction, fetchBulletinPostsAction } from "../redux/actions";
import { useRef, useState } from "react";

const BulletinPost = ({ post }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const hide = location.pathname === "/profile";
  const userId = useSelector((state) => state.user.id);
  const authorId = post.authorId;
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const [postToEdit, setPostToEdit] = useState(null);
  const [content, setContent] = useState("");
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [showLikes, setShowLikes] = useState(false);
  const handleCloseLikes = () => setShowLikes(false);
  const handleShowLikes = () => setShowLikes(true);

  const openEditModal = () => {
    setPostToEdit(post.id);
    console.log("post.id :", post.id);
    setContent(post.content);
    setPreviewUrl(post.mediaUrl || null);
    setImageFile(null);
  };

  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const handleImageChange = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setFileInputKey(Date.now());
  };

  const handleChangeImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(editBulletinPostAction(postToEdit, content, imageFile));
    dispatch(fetchBulletinPostsAction());
    setPostToEdit(null);
    setContent("");
    setImageFile(null);
    setPreviewUrl(null);
  };

  console.log("Post from bulletin post: ", post);
  console.log("Likes from bulletin post: ", post.likes);

  return (
    <>
      <div key={post.id} className="border p-3 rounded shadow-sm mb-3 position-relative post-wrapper" style={{ background: "#fff", overflow: "visible" }}>
        <Container>
          <div className="pin-icon position-absolute" style={{ top: "-20px", right: "-15px", fontSize: "2rem" }}>
            📌
          </div>
          <Row className="mb-4 mt-2">
            <Col xs={2} xl={1} className={hide ? "d-none" : "px-0"}>
              <Button
                onClick={() => navigate(`/profile/${post.authorId}`)}
                className="p-0 bg-transparent border-0 d-none d-sm-block me-2"
                style={{
                  width: "50px",
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
              <Button
                onClick={() => navigate(`/profile/${post.authorId}`)}
                className="p-0 bg-transparent border-0 d-block d-sm-none me-2 mt-1"
                style={{
                  width: "35px",
                  height: "35px",
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
            <Col xs={1} className={!hide ? "d-none" : ""}></Col>
            <Col xs={8} xl={9} className="ps-2">
              <Button
                variant="link"
                style={{ fontWeight: "bold", textDecoration: "none", color: "black" }}
                className="ps-0 pe-1 py-0"
                onClick={() => navigate(`/profile/${post.authorId}`)}
              >
                {post.authorFullName}
              </Button>{" "}
              {post.profileOwnerFullName && <CaretRightFill />}
              {post.profileOwnerFullName && (
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
                  ? new Date(post.createdAt).toLocaleString("en-GB", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "Just now"}
              </p>
            </Col>
            {userId === authorId ? (
              <Col xs={2} className="d-flex justify-content-end align-items-end flex-column-reverse">
                <Dropdown>
                  <Dropdown.Toggle variant="link" style={{ textDecoration: "none", color: "black" }} className="p-0 no-caret">
                    <ThreeDots />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as="button" style={{ background: "none" }} onClick={openEditModal}>
                      Edit Post
                    </Dropdown.Item>
                    <Dropdown.Item as="button" style={{ background: "none" }} onClick={handleShowDeleteModal}>
                      Delete Post
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Modal centered show={showDeleteModal} onHide={handleCloseDeleteModal} backdrop="static" keyboard={false}>
                  <Modal.Header style={{ backgroundColor: "#E5F5E0" }} closeButton>
                    <Modal.Title>Delete Post?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ backgroundImage: `url("/circlebg.png")`, backgroundSize: "cover" }}>
                    Are you sure you want to delete your post? Once deleted it will be gone forever. 💔
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                      Close
                    </Button>
                    <Button
                      variant="outline-success"
                      onClick={() => {
                        dispatch(deleteBulletinPostAction(post.id))
                          .then(() => {
                            setShowDeleteModal(false);
                          })
                          .catch((error) => {
                            console.error("Error deleting post:", error);
                          });
                      }}
                    >
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal show={postToEdit !== null} onHide={() => setPostToEdit(null)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                  <Modal.Header style={{ backgroundColor: "#E5F5E0" }} closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Edit Post?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ backgroundImage: `url("/circlebg.png")`, backgroundSize: "cover" }}>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicTextArea">
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="Share something..."
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="formFile" className="mb-3">
                        <FormControl
                          key={fileInputKey}
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          ref={fileInputRef}
                          style={{ opacity: 0, position: "absolute", top: 0, left: 0, height: "100%", width: "100%", zIndex: -1 }}
                        />
                      </Form.Group>
                      {previewUrl && (
                        <div className="mb-3 position-relative">
                          <Image src={previewUrl} thumbnail style={{ maxHeight: "200px", objectFit: "contain" }} />
                          <div className="pin-icon position-absolute" style={{ top: "-20px", left: "-10px", fontSize: "2rem" }}>
                            <Button variant="success" size="sm" className="rounded-circle" style={{ fontSize: "12px" }} onClick={handleChangeImage}>
                              ✕
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="d-flex justify-content-end">
                        <Button
                          variant="outline-success"
                          size="lg"
                          className="border border-0 px-3 py-1 me-2"
                          onClick={() => fileInputRef.current && fileInputRef.current.click()}
                          type="button"
                        >
                          <ImageFill />
                        </Button>
                        <Button variant="outline-success" type="submit" size="sm" className="me-2">
                          Share
                        </Button>
                      </div>
                    </Form>
                  </Modal.Body>
                </Modal>
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
            <Col className="d-none d-md-flex justify-content-start">
              <Button variant="link" style={{ textDecoration: "none", color: "black" }} className="pb-0" onClick={handleShowLikes}>
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
              <Button variant="link" style={{ textDecoration: "none", color: "black", fontSize: "0.8rem" }} className="pb-0" onClick={handleShowLikes}>
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
        <Modal show={showLikes} centered onHide={handleCloseLikes}>
          <Modal.Header className="px-3 pb-2 pt-3" style={{ backgroundColor: "#E5F5E0" }} closeButton>
            <h4 className="mb-0 p-0">Adores ✨</h4>
          </Modal.Header>
          <Modal.Body style={{ backgroundImage: `url("/circlebg.png")`, backgroundSize: "cover" }}>
            {post.likes.length > 0 ? (
              post.likes.map((like) => (
                <div key={like.id} className="flex items-center space-x-2 mb-2">
                  <Button variant="link" style={{ textDecoration: "none" }}>
                    <Image
                      src={like.userProfilePictureUrl}
                      alt={like.userFullName}
                      className="rounded-4"
                      width={50}
                      height={50}
                      style={{ objectFit: "cover" }}
                    />{" "}
                  </Button>
                  <Button variant="link" style={{ textDecoration: "none", color: "black" }}>
                    <span>{like.userFullName}</span>{" "}
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 m-2">Be the first to adore 💖</p>
            )}
          </Modal.Body>
        </Modal>
        <CommentAndLikeSection postId={post.id} />
      </div>
    </>
  );
};

export default BulletinPost;
