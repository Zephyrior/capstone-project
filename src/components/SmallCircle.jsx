import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";

const SmallCircle = () => {
  const [smallCircle, setSmallCircle] = useState(null);
  return (
    <>
      <Container fluid>
        <div className="border border-1 rounded-3 p-2 text-center" style={{ background: "#E5F5E0" }}>
          {smallCircle ? (
            <p>Small Circle:</p>
          ) : (
            <Button variant="outline-success" className="border border-0" size="sm">
              Add Small Circle <PlusCircleFill />
            </Button>
          )}
        </div>
      </Container>
    </>
  );
};

export default SmallCircle;
