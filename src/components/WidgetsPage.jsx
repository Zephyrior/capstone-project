import { Button, Container } from "react-bootstrap";
import ReminderWidget from "./ReminderWidget";
import SpotifyWidget from "./SpotifyWidget";
import { PlusCircleFill } from "react-bootstrap-icons";

const WidgetsPage = () => {
  return (
    <>
      <Container>
        <div className="border border-1 rounded-3 p-3 d-flex flex-column align-items-center" style={{ background: "#E5F5E0" }}>
          <p>Your widgets:</p>
          <ReminderWidget />
          <SpotifyWidget />
          <Button variant="outline-success" className="border border-0" size="sm">
            add widgets <PlusCircleFill />
          </Button>
        </div>
      </Container>
    </>
  );
};

export default WidgetsPage;
