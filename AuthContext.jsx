import { Button, Col, Row, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase-config'; // Import the initialized auth

export default function AuthPage() {
  const [modalShow, setModalShow] = useState(null);
  const handleShowSignUp = () => setModalShow("SignUp");
  const handleShowLogin = () => setModalShow("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before new attempt
    try {
      await createUserWithEmailAndPassword(auth, username, password);
      console.log("User signed up successfully");
      navigate("/home"); // Redirect after sign up
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before new attempt
    try {
      await signInWithEmailAndPassword(auth, username, password);
      console.log("User logged in successfully");
      navigate("/home"); // Redirect after login
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("Google login successful");
      navigate("/home"); // Redirect after login
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleClose = () => setModalShow(null);

  return (
    <Row
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(0, 0, 0)",
        color: "white",
      }}
    >
      <Col
        sm={6}
        className="p-4 d-flex flex-column justify-content-center align-items-center"
      >
        <h2 style={{ marginBottom: "50px" }}>
          Welcome to Deluxe Car Rental Service
        </h2>
        <Col sm={5} className="d-grid gap-2">
          <Button className="rounded-pill" onClick={handleShowSignUp}>
            Create an account
          </Button>
          <p style={{ fontSize: "12px" }}>
            By signing up, you agree to the Terms of Service and Privacy Policy,
            including Cookie Use.
          </p>

          <p className="mt-5" style={{ fontWeight: "bold" }}>
            Already have an account?
          </p>
          <Button
            className="rounded-pill"
            variant="outline-primary"
            onClick={handleShowLogin}
          >
            Sign in
          </Button>
        </Col>

        {/* Error Message Display */}
        {error && <div style={{ color: "red" }}>{error}</div>}

        <Modal
          show={modalShow !== null}
          onHide={handleClose}
          animation={false}
          centered
        >
          <Modal.Body>
            <h2 className="mb-4" style={{ fontWeight: "bold" }}>
              {modalShow === "SignUp"
                ? "Create your account"
                : "Log in to your account"}
            </h2>
            <Form
              className="d-grid gap-2 px-5"
              onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}
            >
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Control
                  onChange={(e) => setUsername(e.target.value)}
                  type="email" // Use "email" for the username input
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Button className="rounded-pill" type="submit">
                {modalShow === "SignUp" ? "Sign up" : "Log in"}
              </Button>
            </Form>

            {/* Google Sign In Button */}
            {modalShow === "Login" && (
              <Button
                variant="outline-danger"
                onClick={handleGoogleSignIn}
                className="mt-3"
              >
                Sign in with Google
              </Button>
            )}
          </Modal.Body>
        </Modal>
      </Col>
    </Row>
  );
}
