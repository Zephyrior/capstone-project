/* import { useEffect, useState } from "react"; */
import { useEffect } from "react";
import { Button, Container, Image } from "react-bootstrap";
/* import api from "../services/api"; */
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAction } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserAction());
  }, [dispatch]);
  return (
    <>
      <Container fluid className="mb-4 text-center">
        {user && user.completeName ? (
          <div className="border border-1 rounded-3 p-3" style={{ background: "#E5F5E0" }}>
            <div className="border p-3 rounded shadow-sm mb-3 d-flex flex-column align-items-center" style={{ background: "#fff" }}>
              <Button
                variant="link"
                onClick={() => navigate("/profile")}
                className="bg-transparent border-0 d-none d-md-block mb-3"
                style={{
                  width: "68px",
                  height: "75px",
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
                  alt={`Profile picture of ${user.completeName.split(" ")[0]}`}
                  roundedCircle
                  style={{
                    width: "100%",
                    display: "block",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  className="mt-2"
                />
              </Button>
              <p className="mt-2 mb-0" style={{ fontWeight: "bold" }}>
                {user.completeName.split(" ")[0]}
              </p>
              <Button variant="link" style={{ textDecoration: "none", color: "#198754" }} size="sm" onClick={() => navigate("/profile")}>
                View profile
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
