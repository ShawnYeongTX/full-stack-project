import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import "../App.css";

export default function Layout({ children }) {
  const { currentUser, logout } = useContext(AuthContext);

  // if (!currentUser) {
  //   return null;
  // }

  return (
    <div>
      {/* Navbar will always appear on top */}
      <Navbar
        variant="dark"
        style={{
          width: "100%",
          position: "absolute",
          left: 0,
          backgroundColor: "rgba(1, 1, 1, 0.7)",
        }}
      >
        <Container fluid className="d-flex align-items-center">
          <Navbar.Brand
            as={Link}
            to="/home"
            className="me-5"
            style={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            <span style={{ marginRight: "75rem", marginLeft: "1rem" }}>
              DCR
            </span>
          </Navbar.Brand>

          <Navbar.Brand
            as={Link}
            to="/home"
            className="me-3 navbar-text"
            style={{ fontSize: "18px" }}
          >
            <i style={{ marginRight: "5px" }} className="bi bi-house-door"></i>
            Home
          </Navbar.Brand>

          <Navbar.Brand
            as={Link}
            to="/booking"
            className="me-1 navbar-text"
            style={{ fontSize: "18px" }}
          >
            <i
              style={{ marginRight: "5px" }}
              className="bi bi-person-workspace"
            ></i>
            Booking
          </Navbar.Brand>

          <Navbar.Brand
            as={Link}
            to="/contact"
            className="me-1 navbar-text"
            style={{ fontSize: "18px" }}
          >
            <i style={{ marginRight: "5px" }} className="bi bi-telephone"></i>
            Contact Us
          </Navbar.Brand>

          <Navbar.Brand
            as={Link}
            to="/about"
            className="me-1 navbar-text"
            style={{ fontSize: "18px" }}
          >
            <i style={{ marginRight: "5px" }} className="bi bi-info-circle"></i>
            About
          </Navbar.Brand>

          {currentUser ? (
            <Navbar.Brand
              as={Link}
              to="/login"
              className="me-1 navbar-text"
              onClick={logout}
              style={{ fontSize: "18px" }}
            >
              <i
                style={{ marginRight: "5px" }}
                className="bi bi-box-arrow-right"
              ></i>
              Logout
            </Navbar.Brand>
          ) : (
            <Navbar.Brand
              as={Link}
              to="/login"
              className="me-1 navbar-text"
              style={{ fontSize: "18px" }}
            >
              <i
                style={{ marginRight: "5px" }}
                className="bi bi-box-arrow-in-right"
              ></i>
              Login
            </Navbar.Brand>
          )}
        </Container>
      </Navbar>
      {children}
    </div>
  );
}
