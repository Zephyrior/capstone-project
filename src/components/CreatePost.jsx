import { Component } from "react";
import { Button, Form } from "react-bootstrap";

const CreatePost = () => {
  return (
    <>
      <div className="border border-1 rounded-3 p-3 mb-4" style={{ background: "#E5F5E0" }}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Share something..." />
          </Form.Group>

          <Button variant="outline-success" type="submit">
            Share
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CreatePost;
