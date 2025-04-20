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
              &copy; {new Date().getFullYear()} Deluxe Car Rental. All rights
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
          </Col>
          <Col className="text-center">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <i className="bi bi-pin-map">
                <p> Kuala Lumpur, Malaysia</p>
              </i>
              <i className="bi bi-envelope">
                <a href="mailto:support@dcr.com" className="text-light">
                  <p>support@dcr.com</p>
                </a>
              </i>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
