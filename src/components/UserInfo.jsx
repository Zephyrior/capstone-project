import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import api from "../services/api";

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
      <Container>
        {user ? (
          <div>
            <p>{user.completeName}</p>
            <p>{user.email}</p>
          </div>
        ) : (
          <p>Loading user info...</p>
        )}
      </Container>
    </>
  );
};

export default UserInfo;
