import { Container, Row, Col, Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import CarPage from "../components/CarPage";
import "../App.css";
import Footer from "../components/Footer";
import { useBackgroundImage } from "../../backgroundImageContext";

export default function HomePage() {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const backgroundImage = useBackgroundImage();

  useEffect(() => {
    // Redirect to /login if the user is not logged in
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]); // Only re-run when currentUser changes

  return (
    <Container
      fluid
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        margin: "0px",
        padding: "0px",
        width: "100%",
      }}
    >
      <Layout handleLogout={logout}>
        <Row>
          <CarPage />
        </Row>
      </Layout>
      <Footer />
    </Container>
  );
}
