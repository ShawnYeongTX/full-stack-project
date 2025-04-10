import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import NewBookingModal from "../components/NewBookingModal";
import image1 from "../images/1.jpg";
import image2 from "../images/2.jpg";
import image3 from "../images/3.jpg";
import image4 from "../images/4.jpg";
import image5 from "../images/5.jpg";
import image6 from "../images/6.jpg";
import "../App.css";

export default function CarPage() {
  const [make, setCarMake] = useState("");
  const [carId, setCarId] = useState(null); // State to hold the selected car ID
  const [carPrice, setCarPrice] = useState(null); // State to hold the selected car price
  const [show, setShow] = useState(false);

  const handleCloseBookingModal = () => setShow(false);

  const handleShowBookingModal = (title, id, price) => {
    setCarMake(title);
    setCarId(id); // Set the car ID when showing the modal
    setCarPrice(price); // Set the car price when showing the modal
    setShow(true);
  };

  // List of cars with their IDs and prices
  const cars = [
    { id: 1, make: "Lamborghini Huracan", price: 4000, image: image1 },
    { id: 2, make: "Mercedes AMG CLA", price: 1999, image: image2 },
    { id: 3, make: "Toyota Supra 3.0", price: 6000, image: image3 },
    { id: 4, make: "Mclaren 720s", price: 9000, image: image4 },
    { id: 5, make: "BMW i8", price: 6999, image: image5 },
    { id: 6, make: "Ferrari 488 Pista", price: 9999, image: image6 },
  ];

  return (
    <Container>
      <Row className="justify-content-center" style={{ marginTop: "50px" }}>
        {cars.map((car) => (
          <Col md={4} key={car.id} style={{ marginTop: "50px" }}>
            <Card className="rounded-5">
              <Card.Img variant="top" src={car.image} className="rounded-5" />
              <Card.Body>
                <Card.Title>{car.make}</Card.Title>
                <Card.Text>RM {car.price} / day</Card.Text>
                <Button
                  className="btn btn-primary"
                  onClick={() =>
                    handleShowBookingModal(car.title, car.id, car.price)
                  }
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <NewBookingModal
        show={show}
        handleClose={handleCloseBookingModal}
        title={make}
        carId={carId} // Pass the selected car ID to the modal
        carPrice={carPrice} // Pass the selected car price to the modal
      />
    </Container>
  );
}
