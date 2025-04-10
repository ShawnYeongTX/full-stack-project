import { Container, Row, Col, Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import CarPage from "../components/CarPage";
import "../App.css";




export default function HomePage() {

  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  useEffect(() => {
    // Redirect to /login if the user is not logged in
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]); // Only re-run when currentUser changes

  return (
    <Container>
      <Row>
        <Layout handleLogout={logout} />
        <CarPage />
      </Row>
    </Container>
  );
}
