import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

export default function EditUserBooking({
  show,
  onHide,
  onConfirmDelete,
  bookingDetails,
  onEditConfirm,
  carPrice,
}) {
  const [updatedBooking, setUpdatedBooking] = useState({
    name: bookingDetails.name || "",
    contact: bookingDetails.contact || "",
    start_date: bookingDetails.start_date || "",
    end_date: bookingDetails.end_date || "",
    total_price: bookingDetails.total_price || 0,
  });
  const [alertVisible, setAlertVisible] = useState(false);

  console.log("Car Price from EditUserBooking:", carPrice);

  // Calculate price based on days between start and end date
  const calculatePrice = (startDate, endDate, carPrice) => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

    // Calculate difference in days
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include both start and end days

    // Assuming a daily rate of $50 (modify as needed)
    return diffDays * carPrice;
  };

  useEffect(() => {
    setUpdatedBooking({
      name: bookingDetails.name || "",
      contact: bookingDetails.contact || "",
      start_date: bookingDetails.start_date || "",
      end_date: bookingDetails.end_date || "",
      total_price:
        bookingDetails.price ||
        calculatePrice(
          bookingDetails.start_date,
          bookingDetails.end_date,
          carPrice
        ),
    });
  }, [bookingDetails, carPrice]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Map the form control IDs to the state property names
    const fieldMap = {
      "user-details": "name",
      contact: "contact",
      "start-date": "start_date",
      "end-date": "end_date",
    };

    const field = fieldMap[id] || id;

    setUpdatedBooking((prev) => {
      const updatedField = {
        ...prev,
        [field]: value,
      };

      // ✅ Always define these based on updated field values
      const startDate = field === "start_date" ? value : prev.start_date;
      const endDate = field === "end_date" ? value : prev.end_date;

      // ✅ Always recalculate price safely
      updatedField.total_price = calculatePrice(startDate, endDate, carPrice);

      return updatedField;
    });
  };

  const handleEdit = async () => {
    try {
      const total_price = calculatePrice(
        updatedBooking.start_date,
        updatedBooking.end_date,
        carPrice
      );

      const updatedData = {
        ...updatedBooking,
        total_price,
      };

      const response = await axios.put(
        `https://car-booking-api.vercel.app/booking/${bookingDetails.id}`,
        updatedData
      );

      console.log("API Response:", response);

      if (response.data.success && response.data) {
        const confirmedBooking = {
          ...response.data.newBookingDetails,
          id: bookingDetails.id, // ✅ Ensure ID is preserved
          car_details: bookingDetails.car_details, // ✅ Preserve car details
        };

        console.log("Confimed booking before onEditConfirm", confirmedBooking);

        onEditConfirm(confirmedBooking); // 👈 This will now match and log
      } else {
        console.error(
          "Failed to update booking:",
          response.data.message || "No message provided"
        );
      }
      setTimeout(() => setAlertVisible(true), 1000);
      setTimeout(() => onHide(), 4000);
    } catch (error) {
      console.error(
        "Error updating booking:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDelete = async () => {
    try {
      // Make an API call to delete the booking
      const response = await axios.delete(
        `https://car-booking-api.vercel.app/booking/${bookingDetails.id}`
      );

      if (response.data.success) {
        // If the delete is successful, invoke the parent function to update the state
        onConfirmDelete(bookingDetails.id);
      } else {
        console.error("Error deleting booking:", response.data.message);
      }
      setTimeout(() => setAlertVisible(true), 1000);
      // Close the modal after confirming delete
      setTimeout(() => onHide(), 4000);
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update or Delete your Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Error message if booking fails */}
        {alertVisible && (
          <Alert variant="success" className="mt-3">
            Booking details changed succesfully, we will contact you soon for
            confirmation on your recent changes.
          </Alert>
        )}
        <Form>
          <Form.Group className="mb-3" controlId="user-details">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={updatedBooking.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="contact">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="tel"
              value={updatedBooking.contact}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="start-date">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={updatedBooking.start_date}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="end-date">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={updatedBooking.end_date}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={`RM ${updatedBooking.total_price}`}
              disabled
            />
            <Form.Text className="text-muted">
              Price is automatically calculated based on booking duration
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEdit}>
          Update
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
