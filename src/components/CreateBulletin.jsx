import { Component, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, FormControl, Image, Row } from "react-bootstrap";
import { ImageFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBulletinPostsAction, fetchCreateBulletinAction } from "../redux/actions";

const CreateBulletin = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { id } = useParams();

  const profileOwnerId = id === user.id ? null : id;

  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
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

    await dispatch(fetchCreateBulletinAction(content, imageFile, profileOwnerId));
    dispatch(fetchBulletinPostsAction());

    setContent("");
    setImageFile(null);
    setPreviewUrl(null);
  };

  useEffect(() => {
    dispatch(fetchBulletinPostsAction());
  }, [dispatch]);

  return (
    <>
      <div className="border border-1 rounded-3 p-3 mb-4" style={{ background: "#E5F5E0" }}>
        <Container fluid>
          <Row>
            <Col lg={1} className="px-0 d-none d-lg-block">
              <Button
                variant="link"
                onClick={() => navigate("/profile")}
                className="p-0 mt-2 me-1 d-none d-xl-block"
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
                  src={user.profilePictureUrl}
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
                variant="link"
                onClick={() => navigate("/profile")}
                className="p-0 mt-2 me-1 d-block d-xl-none"
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
                  src={user.profilePictureUrl}
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
            <Col xs={12} lg={11} className="ps-1">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 d-none d-md-block" controlId="formBasicTextArea">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Anything under the sun ☀️"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3 d-block d-md-none" controlId="formBasicTextArea">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Anything under the sun ☀️"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ fontSize: "0.9rem" }}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                  <FormControl
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
                    onClick={() => document.getElementById("formFile").click()}
                    type="button"
                  >
                    <ImageFill />
                  </Button>
                  <Button variant="outline-success" type="submit" size="sm" className="me-2">
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

export default CreateBulletin;
