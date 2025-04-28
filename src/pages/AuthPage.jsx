import { Button, Col, Row, Modal, Form } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AuthContext } from "../components/AuthProvider";
import "../App.css";

export default function AuthPage() {
  const [modalShow, setModalShow] = useState(null);
  const handleShowSignUp = () => setModalShow("SignUp");
  const handleShowLogin = () => setModalShow("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (currentUser) navigate("/home");
  }, [currentUser, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      console.log(res.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
      setErrorMessage("Wrong email or password, please try again");
      console.error(error);
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
        color: "white",
      }}
    >
      <Col
        sm={6}
        className="p-4 d-flex flex-column justify-content-center align-items-center"
      >
        <video
          src="../backgroundVideo.mp4"
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: "-1",
          }}
        ></video>
        <h2 style={{ marginBottom: "0.5rem" }}>
          Welcome to Deluxe Car Rental Service
        </h2>
        <br />
        <h5
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "25rem",
            marginBottom: "2rem",
          }}
        >
          We provide a wide selection of cars with an affordable price for
          rental, whether it's daily, weekly or monthly we got you covered.
        </h5>
        <br />
        <h5 style={{ marginBottom: "1rem" }}>
          Create an account now and join us.
        </h5>

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

        <Modal
          show={modalShow !== null}
          onHide={handleClose}
          animation={true}
          centered
          className="trans-modal"
        >
          <Modal.Body>
            <h3
              className="mb-4"
              style={{
                fontWeight: "bold",
              }}
            >
              {modalShow === "SignUp"
                ? "Create your account"
                : "Log in to your account"}
            </h3>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}{" "}
            {/* Display error message */}
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
                <Form.Text className="muted" style={{ color: "white" }}>
                  Password must be at least 6 characters
                </Form.Text>
              </Form.Group>

              <Button className="rounded-pill" type="submit">
                {modalShow === "SignUp" ? "Sign up" : "Log in"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Col>
    </Row>
  );
}
