import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer
      className="bg-grey text-light py-4 mt-3"
      style={{
        backgroundColor: "rgba(1, 1, 1, 0.5)",
        border: "none",
      }}
    >
      <Container fluid>
        <Row>
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} Delux Car Rental. All rights
              reserved.
            </p>
            <p>
              <a href="/privacy-policy" className="text-light">
                Privacy Policy
              </a>{" "}
              |
              <a href="/terms-of-service" className="text-light">
                {" "}
                Terms of Service
              </a>
            </p>
            <p>
              Contact us:{" "}
              <a href="mailto:support@dcr.com" className="text-light">
                support@dcr.com
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
