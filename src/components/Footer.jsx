import { Button } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <div className="mt-3">
        <p className="text-center">
          <Button variant="link" style={{ textDecoration: "none", color: "black" }} className="p-0">
            Circle © 2025
          </Button>
        </p>
      </div>
    </>
  );
};

export default Footer;
