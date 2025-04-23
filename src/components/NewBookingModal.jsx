import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

export default function NewBookingModal({
  show,
  handleClose,
  title,
  carId,
  carPrice,
}) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // To store errors from API
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (show) {
      setName(""); // Reset name field
      setContact(""); // Reset contact field
      setStartDate(""); // Reset date field
      setEndDate(""); // Reset date field
      setBookingDetails(null); // Reset booking details
      setError(""); // Reset error state
    }
  }, [show]);

  const handleBooking = async () => {
    // Ensure the carId and carPrice are correctly passed from the parent component
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const totalPrice =
      carPrice * ((endDateObj - startDateObj) / (1000 * 3600 * 24)); // Calculate total price based on booking duration

    const bookingData = {
      car_id: carId, // carId passed as a prop (ID of the car being booked)
      user_id: currentUser.uid, // Replace with actual user ID from authentication
      start_date: startDate,
      end_date: endDate,
      total_price: totalPrice.toFixed(2), // Make sure it's in a valid number format
      name: name,
      contact: contact,
    };
    console.log("Booking Data", bookingData);

    try {
      setIsLoading(true); // Start loading
      const response = await axios.post(
        "https://car-booking-api.vercel.app/newbooking", // Update with your actual API endpoint
        bookingData
      );
      console.log(currentUser);

      if (response.data && response.data.car) {
        // Assuming the API returns car details inside a 'car' property in the response
        setBookingDetails(response.data);
      } else {
        setError("Booking failed. Car details are unavailable.");
      }
    } catch (error) {
      console.error(
        "Error booking car:",
        error.response ? error.response.data : error.message
      );
      setError("Something went wrong while booking. Please try again.");
    } finally {
      setIsLoading(false); // End loading
      handleClose(); // Close the modal after booking
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Booking for {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your contact number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Form>

          {/* Error message if booking fails */}
          {error && <p className="text-danger">{error}</p>}

          {/* Display booking confirmation if bookingDetails is available */}
          {bookingDetails ? (
            <div>
              <h5>Booking Confirmed!</h5>
              {bookingDetails.car ? (
                <>
                  <p>
                    <strong>Car:</strong> {bookingDetails.car.make}{" "}
                    {bookingDetails.car.model}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {bookingDetails.start_date}
                  </p>
                  <p>
                    <strong>End Date:</strong> {bookingDetails.end_date}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ${bookingDetails.total_price}
                  </p>
                </>
              ) : (
                <p>Car information is unavailable.</p>
              )}
            </div>
          ) : (
            <p>
              {isLoading
                ? "Booking in progress..."
                : "Fill in your details to book."}
            </p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleBooking}
            disabled={isLoading} // Disable button while booking is in progress
          >
            {isLoading ? "Booking..." : "Book Now"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
