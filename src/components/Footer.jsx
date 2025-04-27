import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  useEffect(() => {
    // Initialize the Google Map when the component mounts
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAlAeJJy5zhAGvUH3f2qskFq5ELLgkq994&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Initialize the map and add a marker
    window.initMap = function () {
      const location = { lat: 3.0566, lng: 101.512 }; // Coordinates for Kuala Lumpur //3.05616052705681, 101.51150782479358

      // Create the map centered at the location
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 12,
      });

      // Create a marker (drop pin) at the specified location
      new window.google.maps.Marker({
        position: location,
        map: map,
        title: "Deluxe Car Rental", // Optional: set a title for the marker
      });
    };

    // Cleanup the script on component unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
          {/* Footer text column */}
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
          {/* Contact info column */}
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

        {/* Map Row */}
        <Row>
          <Col className="text-center">
            <div
              id="map"
              style={{
                width: "100%",
                height: "300px", // Adjust map height as needed
                borderRadius: "8px",
                marginTop: "20px",
              }}
            ></div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
