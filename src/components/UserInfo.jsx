import { useEffect, useState } from "react";
import { Button, Container, Image } from "react-bootstrap";
import api from "../services/api";
import { Link } from "react-router-dom";

const UserInfo = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  const fetchUser = () => {
    if (token) {
      api
        .get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <>
      <Container fluid className="mb-4 text-center">
        {user ? (
          <div className="border border-1 rounded-3 p-2" style={{ background: "#E5F5E0" }}>
            <Image
              src={user.profilePictureUrl}
              alt={`Profile picture of ${user.completeName}`}
              roundedCircle
              style={{ width: "100%", maxWidth: "100px", height: "auto", objectFit: "cover" }}
              className="mt-2 mb-3"
            />
            <p className="mt-2 mb-0" style={{ fontWeight: "bold" }}>
              {user.completeName}
            </p>
            <Button variant="link" style={{ textDecoration: "none", color: "#198754" }}>
              View your profile
            </Button>
          </div>
        ) : (
          <p>Loading user info...</p>
        )}
      </Container>
    </>
  );
};

export default UserInfo;
