import { Container, Row, Col, Card } from "react-bootstrap";
import { useBackgroundImage } from "../../backgroundImageContext";
import Layout from "../components/Layout";
import Footer from "../components/Footer";

import "../App.css";

export default function AboutPage() {
  const backgroundImage = useBackgroundImage();

  return (
    <Container
      fluid
      className="d-flex flex-column min-vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: "0px",
        padding: "0px",
        width: "100%",
      }}
    >
      <Layout />
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col
          md={10}
          style={{
            backgroundColor: "rgba(1, 1, 1, 0.8)",
            padding: "30px",
            borderRadius: "30px",
            color: "white",
            fontFamily: "cursive",
          }}
        >
          <h3 className="about-title">About Us</h3>

          <p className="about-text">
            At Deluxe Car Rental, we believe that every journey should be as
            enjoyable as the destination. Founded with a passion for excellence
            and a commitment to exceptional service, Deluxe Car Rental offers a
            premium selection of vehicles tailored to meet the diverse needs of
            our customers—whether you're traveling for business, pleasure, or
            anything in between. We pride ourselves on delivering a seamless
            rental experience from start to finish. Our fleet includes
            everything from sleek sedans and luxury SUVs to spacious vans and
            stylish convertibles, all meticulously maintained for your comfort
            and safety. What sets us apart is our dedication to personalized
            service, competitive rates, and flexibility that fits your schedule.
            With transparent pricing, convenient booking options, and a friendly
            team ready to assist, Deluxe Car Rental makes premium car hire
            simple and stress-free. Wherever the road takes you, choose Deluxe
            Car Rental—drive in style, arrive in confidence.
          </p>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}
