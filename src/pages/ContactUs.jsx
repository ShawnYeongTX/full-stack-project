import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useBackgroundImage } from "../../backgroundImageContext";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";

export default function ContactUs() {
  const backgroundImage = useBackgroundImage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const [alertVisible, setAlertVisible] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Inquiries to send:", formData);

    try {
      const response = await axios.post(
        "https://car-booking-api.vercel.app/inquiry",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setFormData({
          name: "",
          email: "",
          contact: "",
          message: "",
        });

        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 5000);
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.error);
      }
    } catch (err) {
      console.error("Error submitting inquiry:", err);
      alert("Something went wrong.");
    }
  };

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
          md={6}
          style={{
            backgroundColor: "rgba(1, 1, 1, 0.8)",
            padding: "30px",
            borderRadius: "30px",
            color: "white",
          }}
        >
          {/* Alert Message */}
          {alertVisible && (
            <Alert variant="success" className="mt-3">
              We have well received your message and we will get back to you as
              soon as possible, thank you for visiting DCR!
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicContact">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                name="contact"
                type="tel"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter your contact number"
              />
            </Form.Group>

            <Form.Group controlId="message">
              <Form.Label>Write a message</Form.Label>
              <Form.Control
                name="message"
                as="textarea"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit" className="mt-5">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}
