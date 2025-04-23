import { Modal, Button, Form } from "react-bootstrap";
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

  // Calculate price based on days between start and end date
  const calculatePrice = (startDate, endDate) => {
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
        calculatePrice(bookingDetails.start_date, bookingDetails.end_date),
    });
  }, [bookingDetails]);

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
      const newState = {
        ...prev,
        [field]: value,
      };

      // Recalculate price when dates change
      if (field === "start_date" || field === "end_date") {
        newState.price = calculatePrice(
          field === "start_date" ? value : prev.start_date,
          field === "end_date" ? value : prev.end_date
        );
      }

      return newState;
    });
  };

  const handleEdit = async () => {
    try {
      const total_price = calculatePrice(
        updatedBooking.start_date,
        updatedBooking.end_date
      );
      const response = await axios.put(
        `https://car-booking-api.vercel.app/booking/${bookingDetails.id}`,
        updatedBooking
      );

      console.log("API Response:", response);

      if (response.data.success) {
        onEditConfirm(response.data.newBookingDetails);
      } else {
        console.error("Failed to update booking:", response.data.message);
      }
      onHide();
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

      // Close the modal after confirming delete
      onHide();
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
