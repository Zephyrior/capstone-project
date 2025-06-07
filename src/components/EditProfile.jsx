import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { fetchUserAction } from "../redux/actions";
import imageCompression from "browser-image-compression";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const fileInputRef = useRef(null);

  /*   const userFirstName = user?.completeName?.split(" ")[0] || "";
  const userLastName = user?.completeName?.split(" ")[1] || ""; */

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [shoutOut, setShoutout] = useState("");
  const [bio, setBio] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [hobby, setHobby] = useState("");
  const [location, setLocation] = useState("");
  const [nickName, setNickName] = useState("");
  const [smallCircleAsFeatured, setSmallCircleAsFeatured] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  /*   const [firstName, setFirstName] = useState(userFirstName);
  const [lastName, setLastName] = useState(userLastName);
  const [birthDate, setBirthDate] = useState(user.birthDate);
  const [email, setEmail] = useState(user.email);
  const [shoutOut, setShoutout] = useState(user.shoutOut);
  const [bio, setBio] = useState(user.bio);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [hobby, setHobby] = useState(user.hobby);
  const [location, setLocation] = useState(user.location);
  const [nickName, setNickName] = useState(user.nickName);
  const [smallCircleAsFeatured, setSmallCircleAsFeatured] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(""); */

  const isAtLeast18 = (dateString) => {
    const today = new Date();
    const birth = new Date(dateString);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    return age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
  };

  const sendEmail = async (to, fullName) => {
    console.log("Sending email to:", to);
    const token = localStorage.getItem("token");
    try {
      const response = await api.post(
        "/emails/update",
        { to, fullName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error in sending email ", error);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePictureUrl(file);

    if (file) {
      setProfilePictureFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setProfilePictureFile(null);
      setPreviewUrl(user.profilePictureUrl || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAtLeast18(birthDate)) {
      setError("You must be at least 18 years old...");
      return;
    }
    try {
      let mediaUrl = user.profilePictureUrl;

      if (profilePictureFile) {
        const compressedFile = await imageCompression(profilePictureFile, {
          maxSizeMB: 1.5,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        });

        const formData = new FormData();
        formData.append("file", compressedFile);

        const uploadResponse = await api.post("/images/uploadme", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        mediaUrl = uploadResponse.data.url;
      }
      const postResponse = await api.put(
        "/auth/update",
        { firstName, lastName, birthDate, email, shoutOut, bio, hobby, location, nickName, smallCircleAsFeatured, profilePictureUrl: mediaUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Edit profile FE: ", postResponse);
      dispatch(fetchUserAction());
      setSuccessMessage("Profile updated successfully! 🎉");
      setTimeout(() => setSuccessMessage(""), 4000);
      sendEmail(email, `${firstName}  ${lastName}`);
    } catch (error) {
      console.error("Error editing profile: ", error);
    }
  };

  useEffect(() => {
    setError("");
  }, [birthDate]);

  useEffect(() => {
    if (user) {
      const [first, last] = user.completeName ? user.completeName.split(" ") : ["", ""];
      setFirstName(first);
      setLastName(last);
      setBirthDate(user.birthDate || "");
      setEmail(user.email || "");
      setShoutout(user.shoutOut || "");
      setBio(user.bio || "");
      setProfilePictureUrl(user.profilePictureUrl || null);
      setProfilePictureFile(null);
      setHobby(user.hobby || "");
      setLocation(user.location || "");
      setNickName(user.nickName || "");
      setSmallCircleAsFeatured(user.smallCircleAsFeatured || false);
      setPreviewUrl(user.profilePictureUrl || null);
    }
  }, [user]);

  return (
    <>
      <div>
        <Container>
          {token ? (
            <Row>
              <Col md={10} className="mx-auto border border-1 rounded-3 p-4" style={{ background: "#E5F5E0" }}>
                <Row>
                  <h3>Edit profile</h3>
                  <Col md={6} className="mb-4">
                    <div className="position-relative">
                      <div className="pin-icon position-absolute" style={{ top: "-25px", right: "-10px", fontSize: "3rem" }}>
                        📌
                      </div>
                      <div className="pin-icon position-absolute" style={{ bottom: "-20px", left: "1px", fontSize: "4rem", transform: "rotate(270deg)" }}>
                        🩹
                      </div>
                      <Button variant="link" style={{ textDecoration: "none" }} onClick={handlePhotoClick}>
                        {previewUrl ? <Image fluid src={previewUrl} /> : <Image fluid src={user.profilePictureUrl} />}
                      </Button>
                    </div>
                    <div className="text-center mt-2">
                      <p className="text-muted" style={{ fontSize: "0.8rem" }}>
                        Click on the photo to change profile picture. 😉
                      </p>
                    </div>
                    {successMessage && (
                      <div className="mb-3">
                        <div className="alert alert-warning text-center" role="alert">
                          {successMessage}
                        </div>
                      </div>
                    )}
                  </Col>
                  <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>👤 First name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your first name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>👤 Last name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicNickName">
                        <Form.Label>🥳 Nickname</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Endearment your friends call you. 😌"
                          value={nickName}
                          onChange={(e) => setNickName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicBirthday">
                        <Form.Label>🎉 Enter your birthday</Form.Label>
                        <Form.Control type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                        <Form.Text className="text-muted">Remember, 18 years old and above, okay? 😉</Form.Text>
                        {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>✉️ Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicLocation">
                        <Form.Label>📍 Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter your location" value={location} onChange={(e) => setLocation(e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicBio">
                        <Form.Label>🌱 Bio</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="Tell something about yourself ✨"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicHobby">
                        <Form.Label>🚵🏼 Hobbies</Form.Label>
                        <Form.Control type="text" placeholder="What you love doing 💕" value={hobby} onChange={(e) => setHobby(e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicShoutOut">
                        <Form.Label>🗣️ What are you thinking?</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Status? Thoughts? Song title? Say it."
                          value={shoutOut}
                          onChange={(e) => setShoutout(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-5">
                        <Form.Label>👯‍♀️ Boast your small circle?</Form.Label>
                        <div className="d-flex gap-3">
                          <Form.Check
                            type="radio"
                            label="Yes? 🥰"
                            value="true"
                            name="radioGroup"
                            checked={smallCircleAsFeatured === true}
                            onChange={() => setSmallCircleAsFeatured(true)}
                          />
                          <Form.Check
                            type="radio"
                            label="No. 😔"
                            value="false"
                            name="radioGroup"
                            checked={smallCircleAsFeatured === false}
                            onChange={() => setSmallCircleAsFeatured(false)}
                          />
                        </div>
                      </Form.Group>
                      <Form.Group controlId="formFile" className="mb-3" style={{ display: "none" }}>
                        <Form.Control type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
                      </Form.Group>
                      <div className="d-md-flex justify-content-end my-3 me-3 d-none">
                        <Button variant="outline-success" size="lg" type="submit">
                          Save changes
                        </Button>
                      </div>
                      <div className="text-center d-md-none">
                        <Button variant="outline-success" size="lg" type="submit">
                          Save changes
                        </Button>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : (
            <p>
              Session expired.{" "}
              <Button as="span" variant="link" style={{ textDecoration: "none", verticalAlign: "baseline" }} className="p-0" onClick={() => navigate("/")}>
                Login to continue.
              </Button>
            </p>
          )}
        </Container>
        <Footer />
      </div>
    </>
  );
};
export default EditProfile;
