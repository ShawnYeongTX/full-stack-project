import { Card, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import NewBookingModal from "../components/NewBookingModal";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import "../App.css";

export default function CarPage() {
  const [make, setCarMake] = useState("");
  const [carId, setCarId] = useState(null); // State to hold the selected car ID
  const [carPrice, setCarPrice] = useState(null); // State to hold the selected car price
  const [show, setShow] = useState(false);
  const [carImages, setCarImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCloseBookingModal = () => setShow(false);

  const handleShowBookingModal = (title, id, price) => {
    setCarMake(title);
    setCarId(id); // Set the car ID when showing the modal
    setCarPrice(price); // Set the car price when showing the modal
    setShow(true);
  };

  const fetchImages = async () => {
    try {
      const storageRef = ref(storage, "carPics");
      const result = await listAll(storageRef);
      const imageUrls = await Promise.all(
        result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url, ref: itemRef };
        })
      );
      setCarImages(imageUrls);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // List of cars with their IDs and prices
  const cars = [
    {
      id: 1,
      make: "Lamborghini Huracan",
      price: 4000,
      image: carImages[0] ? carImages[0].url : " ",
    },
    {
      id: 2,
      make: "Mercedes AMG CLA",
      price: 1999,
      image: carImages[1] ? carImages[1].url : " ",
    },
    {
      id: 3,
      make: "Toyota Supra 3.0",
      price: 6000,
      image: carImages[2] ? carImages[2].url : " ",
    },
    {
      id: 4,
      make: "Mclaren 720s",
      price: 9000,
      image: carImages[3] ? carImages[3].url : " ",
    },
    {
      id: 5,
      make: "BMW i8",
      price: 6999,
      image: carImages[4] ? carImages[4].url : " ",
    },
    {
      id: 6,
      make: "Ferrari 488 Pista",
      price: 9999,
      image: carImages[5] ? carImages[5].url : " ",
    },
    {
      id: 7,
      make: "Ferrari 458 Italia",
      price: 7999,
      image: carImages[6] ? carImages[6].url : " ",
    },
    {
      id: 8,
      make: "Honda Civic Type R FK8",
      price: 5000,
      image: carImages[7] ? carImages[7].url : " ",
    },
  ];

  return (
    <Container>
      <Row className="justify-content-center" style={{ marginTop: "50px" }}>
        {loading ? ( // Check if loading
          <Col
            md={4}
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        ) : (
          cars.map((car) => (
            <Col md={3} key={car.id} style={{ marginTop: "50px" }}>
              <Card
                className="rounded-5"
                style={{
                  backgroundColor: "rgba(1, 1, 1, 0.5)",
                  border: "none",
                  marginLeft: "15px",
                  marginRight: "15px",
                }}
              >
                <Card.Img variant="top" src={car.image} className="rounded-5" />
                <Card.Body>
                  <Card.Title style={{ color: "white" }}>{car.make}</Card.Title>
                  <Card.Text style={{ color: "white" }}>
                    RM {car.price} / day
                  </Card.Text>
                  <Button
                    className="btn btn-primary"
                    onClick={
                      () => handleShowBookingModal(car.make, car.id, car.price) // Fixed car.title to car.make
                    }
                  >
                    Book Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
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
