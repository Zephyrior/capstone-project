import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <Container fluid style={{ background: "#E5F5E0" }} className="px-0 w-100 vh-100 border border start-5">
        <Container className="p-5">
          <Form className="border border-1 rounded p-3">
            <h2 className="ms-2"> {isLogin ? "Login" : "Register"}</h2>
            {!isLogin && (
              <div>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your first name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control type="email" placeholder="Enter your last name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBirthday">
                  <Form.Label>Enter your birthday</Form.Label>
                  <Form.Control type="date" />
                  <Form.Text className="text-muted">To register you must be 18 years old and above.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
              </div>
            )}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="outline-success" className="ms-2" type="submit">
              {isLogin ? "Login" : "Register"}
            </Button>
          </Form>
        </Container>
      </Container>
    </>
  );
};

export default Login;
