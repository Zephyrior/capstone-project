import { useState } from "react";
import { Button, Container } from "react-bootstrap";

const SmallCircle = () => {
  const [smallCircle, setSmallCircle] = useState(null);
  return (
    <>
      <Container fluid>
        <div className="border border-1 rounded-3 p-2 text-center" style={{ background: "#E5F5E0" }}>
          {smallCircle ? (
            <p>Small Circle:</p>
          ) : (
            <Button variant="outline-success" className="border border-0">
              Add Small Circle
            </Button>
          )}
        </div>
      </Container>
    </>
  );
};

export default SmallCircle;
