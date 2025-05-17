import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log("api url", apiUrl);
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await api.post(`${apiUrl}${endpoint}`, isLogin ? { email, password } : { email, password, firstName, lastName, birthDate });
      localStorage.setItem("token", response.data.token);
      isLogin ? setToken(response.data.token) : localStorage.removeItem("token");
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Errore");
    }
  };

  return (
    <>
      <Container fluid style={{ background: "#E5F5E0" }} className="px-0 w-100 vh-100 border border start-5">
        <Container className="p-5">
          <Form className="border border-1 rounded p-3" onSubmit={handleSubmit}>
            <h2 className="ms-2"> {isLogin ? "Login" : "Register"}</h2>
            {!isLogin && (
              <div>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBirthday">
                  <Form.Label>Enter your birthday</Form.Label>
                  <Form.Control type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                  <Form.Text className="text-muted">To register you must be 18 years old and above.</Form.Text>
                </Form.Group>
              </div>
            )}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            <Button variant="outline-success" className="ms-2" type="submit">
              {isLogin ? "Login" : "Register"}
            </Button>
            <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Create an account" : "Already registered? Login"}
            </Button>
          </Form>
        </Container>
      </Container>
    </>
  );
};

export default Login;
