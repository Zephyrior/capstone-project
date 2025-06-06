import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Footer from "./Footer";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = "";
  const [error, setError] = useState("");

  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const sendEmail = async (to, fullName) => {
    console.log("Sending email to:", to);
    try {
      const response = await api.post(
        "/emails/registration",
        { to, fullName },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error in sending email ", error);
    }
  };

  const isAtLeast18 = (dateString) => {
    const today = new Date();
    const birth = new Date(dateString);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    return age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = import.meta.env.VITE_API_URL;
    console.log("api url", apiUrl);

    if (!isLogin && !isAtLeast18(birthDate)) {
      setError("You must be at least 18 years old to register.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await api.post(`${apiUrl}${endpoint}`, isLogin ? { email, password } : { email, password, firstName, lastName, birthDate });
      localStorage.setItem("token", response.data.token);
      console.log(response);
      setToken(response.data.token);
      navigate(isLogin ? "/home" : "/");
      setIsLogin(true);
      {
        !isLogin && sendEmail(email, `${firstName}  ${lastName}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data || "Error";
      setError(errorMessage);
    }
  };

  useEffect(() => {
    if (token) {
      console.log("Token retrieved: ", token);
    }
  }, [token]);

  useEffect(() => {
    setError("");
  }, [firstName, lastName, birthDate, email, password, confirmPassword]);

  return (
    <>
      <Container fluid style={{ background: "#E5F5E0" }} className="px-0 d-flex justify-content-between flex-column vh-100 border border start-5">
        <Container className="p-5 mt-5">
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
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                maxLength={20}
                required
              />
              {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
            </Form.Group>
            {!isLogin && (
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Button variant="outline-success" className="ms-2" type="submit">
              {isLogin ? "Login" : "Register"}
            </Button>
            <Button variant="link" size="sm" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Create an account" : "Already registered? Login"}
            </Button>
          </Form>
        </Container>
        <Footer />
      </Container>
    </>
  );
};

export default Login;
