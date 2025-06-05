/* import { useEffect, useState } from "react"; */
import { useEffect } from "react";
import { Button, Container, Image } from "react-bootstrap";
/* import api from "../services/api"; */
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAction } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  /*   const token = localStorage.getItem("token");
  const [user, setUser] = useState(null); */

  /*   const fetchUser = () => {
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
  }; */

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserAction());
  }, [dispatch]);
  return (
    <>
      <Container fluid className="mb-4 text-center">
        {user ? (
          <div className="border border-1 rounded-3 p-3" style={{ background: "#E5F5E0" }}>
            <div className="border p-3 rounded shadow-sm mb-3" style={{ background: "#fff" }}>
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
              <Button variant="link" style={{ textDecoration: "none", color: "#198754" }} size="sm" onClick={() => navigate("/profile")}>
                View your profile
              </Button>
            </div>
          </div>
        ) : (
          <p>Loading user info...</p>
        )}
      </Container>
    </>
  );
};

export default UserInfo;
