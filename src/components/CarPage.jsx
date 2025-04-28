import { Card, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NewBookingModal from "../components/NewBookingModal";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { AuthContext } from "./AuthProvider";
import "../App.css";
import axios from "axios";

export default function CarPage() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [make, setCarMake] = useState("");
  const [model, setCarModel] = useState("");
  const [year, setCarYear] = useState(null);
  const [carId, setCarId] = useState(null); // State to hold the selected car ID
  const [carPrice, setCarPrice] = useState(null); // State to hold the selected car price
  const [show, setShow] = useState(false);
  const [carImages, setCarImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carsDetails, setCarsDetails] = useState([]);

  const handleCloseBookingModal = () => setShow(false);

  const handleShowBookingModal = (title, carId, price, model, year) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    console.log("Title:", title);
    console.log("Car ID:", carId);
    console.log("Price:", price);
    console.log("Car Year Booking Modal:", year);
    console.log("Car Model Booking Modal:", model);
    console.log("Setting car price", carPrice);
    setCarMake(title);
    setCarModel(model);
    setCarYear(year);
    setCarId(carId); // Set the car ID when showing the modal
    setCarPrice(price); // Set the car price when showing the modal
    setShow(true);
  };

  const fetchCars = async () => {
    try {
      const response = await axios.get(
        "https://car-booking-api.vercel.app/cars"
      );
      const carsFromApi = response.data.data;

      const updatedCars = carsFromApi.map((car) => {
        return {
          ...car,
        };
      });

      setCarsDetails(updatedCars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
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
    fetchCars();
  }, []);

  // List of cars with their IDs and prices
  const cars = carsDetails.map((car, index) => ({
    carId: car.id,
    make: car.make,
    model: car.model,
    year: car.year,
    price: car.price_per_day,
    image: carImages[index] ? carImages[index].url : " ",
  }));

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
                  <Card.Title style={{ color: "white" }}>
                    {car.make} {car.model} ({car.year})
                  </Card.Title>
                  <Card.Text style={{ color: "white" }}>
                    RM {car.price} / day
                  </Card.Text>
                  <Button
                    className="btn btn-primary"
                    onClick={() =>
                      handleShowBookingModal(
                        car.make,
                        car.carId,
                        car.price,
                        car.model,
                        car.year
                      )
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
        model={model}
        year={year}
        carId={carId}
        carPrice={carPrice}
      />
    </Container>
  );
}
