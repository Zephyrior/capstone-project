import { Button, Container } from "react-bootstrap";
import ReminderWidget from "./ReminderWidget";
import SpotifyWidget from "./SpotifyWidget";
import { PlusCircleFill } from "react-bootstrap-icons";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

const WidgetsPage = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <>
      <Container>
        {token ? (
          <div>
            <div className="border border-1 rounded-3 p-3 d-flex flex-column align-items-center" style={{ background: "#E5F5E0" }}>
              <p>Your widgets:</p>
              <ReminderWidget />
              <SpotifyWidget />
              <Button variant="outline-success" className="border border-0" size="sm">
                add widgets <PlusCircleFill />
              </Button>
            </div>
            <div className="d-md-none">
              <Footer />
            </div>
          </div>
        ) : (
          <p>
            Session expired.{" "}
            <Button as="span" variant="link" style={{ textDecoration: "none", verticalAlign: "baseline" }} className="p-0" onClick={() => navigate("/Login")}>
              Login to continue.
            </Button>
          </p>
        )}
      </Container>
    </>
  );
};

export default WidgetsPage;
