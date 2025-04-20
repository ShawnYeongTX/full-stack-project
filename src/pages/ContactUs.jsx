import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useBackgroundImage } from "../../backgroundImageContext";
import Layout from "../components/Layout";
import Footer from "../components/Footer";

export default function ContactUs() {
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
          md={6}
          style={{
            backgroundColor: "rgba(1, 1, 1, 0.8)",
            padding: "30px",
            borderRadius: "30px",
            color: "white",
          }}
        >
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="basicEmail" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group controlId="formBasicContact">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your contact number"
                pattern="[0-9]*"
              />
            </Form.Group>

            <Form.Group controlId="message">
              <Form.Label>Write a message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message"
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
