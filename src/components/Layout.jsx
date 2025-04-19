// import bgImage from "../src/assets/background.jpeg";
import { Link } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";

export default function Layout({ children }) {
  const { currentUser, logout } = useContext(AuthContext);

  if (!currentUser) {
    return null;
  }

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
        <Container fluid>
          <Navbar.Brand as={Link} to="/home">
            <i style={{ marginRight: "5px" }} className="bi bi-house-door"></i>
            Home
          </Navbar.Brand>

          <Navbar.Brand as={Link} to="/booking">
            <i
              style={{ marginRight: "5px" }}
              className="bi bi-person-workspace"
            ></i>
            Booking
          </Navbar.Brand>

          <Navbar.Brand as={Link} to="/contact">
            <i style={{ marginRight: "5px" }} className="bi bi-telephone"></i>
            Contact
          </Navbar.Brand>

          <Navbar.Brand as={Link} to="/about">
            <i style={{ marginRight: "5px" }} className="bi bi-info-circle"></i>
            About
          </Navbar.Brand>

          <Navbar.Brand as={Link} to="/login" onClick={logout}>
            <i
              style={{ marginRight: "5px" }}
              className="bi bi-box-arrow-right"
            ></i>
            Logout
          </Navbar.Brand>
        </Container>
      </Navbar>
      {children}
    </div>
  );
}
