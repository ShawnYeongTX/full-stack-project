import Layout from "./Layout";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import {
  Card,
  Button,
  Row,
  Col,
  Spinner,
  Container,
  Alert,
} from "react-bootstrap"; // Import Spinner for loading state
import EditUserBooking from "./EditUserBooking";
import Footer from "./Footer";
import { useBackgroundImage } from "../../backgroundImageContext"; // Import the background image context

export default function UserBookings() {
  const nagivate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const backgroundImage = useBackgroundImage(); // Get the background image from context
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      nagivate("/login");
    } else if (currentUser?.uid) {
      handleUserBooking(currentUser.uid);
    }
  }, [currentUser, nagivate]);

  const handleUserBooking = async (user_id) => {
    try {
      const response = await axios.get(
        `https://car-booking-api.vercel.app/booking/${user_id}`
      );

      if (
        response.data &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        const bookingsWithPrice = response.data.data.map((booking) => ({
          ...booking,
          price_per_day: parseFloat(booking.car_details?.price_per_day || 0),
        }));

        console.log("Bookings with price_per_day:", bookingsWithPrice);

        setBookingDetails(bookingsWithPrice);
      } else {
        console.error("No booking details found for this user.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Booking details:", bookingDetails);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-MY");
  };

  const formatCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
    }).format(amount);
    return formattedAmount;
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setShowEditModal(true);
  };

  const handleEditConfirm = (updatedBooking) => {
    console.log("Edit Confimed:", updatedBooking);
    const updatedBookings = bookingDetails.map((booking) =>
      booking.id === updatedBooking.id ? updatedBooking : booking
    );
    setBookingDetails(updatedBookings);
  };

  const handleConfirmDelete = (deletedBookingId) => {
    const updatedBookings = bookingDetails.filter(
      (booking) => booking.id !== deletedBookingId
    );
    setBookingDetails(updatedBookings);
    setShowEditModal(false);
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
      <div className="user-booking flex-grow-1">
        {isLoading ? (
          <Row
            className="justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Row>
        ) : bookingDetails.length > 0 ? (
          <Row>
            {bookingDetails.map((booking) => (
              <Col md={4} key={booking.id} className="mb-4 mt-5">
                <Card
                  className="rounded-5"
                  style={{
                    backgroundColor: "rgba(1, 1, 1, 0.8)",
                    border: "none",
                    color: "white",
                    marginLeft: "15px",
                    marginRight: "15px",
                    marginTop: "50px",
                  }}
                >
                  <Card.Body>
                    <Card.Title>
                      {booking.car_details.make} {booking.car_details.model}
                    </Card.Title>
                    <Card.Text style={{ color: "white" }}>
                      <strong>Name:</strong> {booking.name} <br />
                      <strong>Contact:</strong> {booking.contact} <br />
                      <strong>Start Date:</strong>{" "}
                      {formatDate(booking.start_date)} <br />
                      <strong>End Date:</strong> {formatDate(booking.end_date)}{" "}
                      <br />
                      <strong>Total Price:</strong>{" "}
                      {formatCurrency(booking.total_price)}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleEditBooking(booking)}
                    >
                      Manage Booking
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p>No current bookings found.</p>
        )}
      </div>
      <Footer />
      {showEditModal && selectedBooking && (
        <EditUserBooking
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          bookingDetails={selectedBooking}
          onConfirmDelete={handleConfirmDelete}
          onEditConfirm={handleEditConfirm}
          carPrice={selectedBooking.price_per_day}
        />
      )}
      {alertVisible && (
        <Alert variant="success" className="mt-3">
          Booking succesful, we will contact you soon for the pickup location.
          Meanwhile we hope you enjoyed your time at DCR.
        </Alert>
      )}
    </Container>
  );
}
