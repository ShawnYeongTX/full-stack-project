import Layout from "./Layout";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Card, Button } from "react-bootstrap";
import EditUserBooking from "./EditUserBooking";

export default function UserBookings() {
  const { currentUser } = useContext(AuthContext);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (currentUser?.uid) {
      handleUserBooking(currentUser.uid);
    }
  }, [currentUser]);

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
        setBookingDetails(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("No booking details found for this user.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

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
    // Handle booking update in the parent component
    console.log("Updated Booking received in parent", updatedBooking); // to check whether the updated details has been passed from another component
    const updatedBookings = bookingDetails.map((booking) =>
      booking.id === updatedBooking.id ? updatedBooking : booking
    );
    setBookingDetails(updatedBookings);
    setShowEditModal(false);
  };

  const handleConfirmDelete = (deletedBookingId) => {
    const updatedBookings = bookingDetails.filter(
      (booking) => booking.id !== deletedBookingId
    );

    setBookingDetails(updatedBookings);
    setShowEditModal(false);
  };

  return (
    <>
      <Layout />
      <Card>
        <div className="user-booking">
          <h2>Your current bookings</h2>

          {isLoading ? (
            <p>Loading your booking details...</p>
          ) : bookingDetails.length > 0 ? (
            bookingDetails.map((booking) => (
              <div key={booking.id}>
                <p>
                  <strong>Car:</strong> {booking.car_details.make}{" "}
                  {booking.car_details.model}
                </p>
                <p>
                  <strong>Name:</strong> {booking.name}
                </p>
                <p>
                  <strong>Contact:</strong> {booking.contact}
                </p>
                <p>
                  <strong>Start Date:</strong> {formatDate(booking.start_date)}
                </p>
                <p>
                  <strong>End Date:</strong> {formatDate(booking.end_date)}
                </p>
                <p>
                  <strong>Total Price (RM):</strong>{" "}
                  {formatCurrency(booking.total_price)}
                </p>
                <Button
                  variant="primary"
                  className="mx-2"
                  onClick={() => handleEditBooking(booking)}
                >
                  Manage Booking
                </Button>
                <hr />
              </div>
            ))
          ) : (
            <p>No current bookings found.</p>
          )}
        </div>
      </Card>
      {showEditModal && selectedBooking && (
        <EditUserBooking
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          bookingDetails={selectedBooking}
          onConfirmDelete={handleConfirmDelete} // Pass confirm delete handler
          onEditConfirm={handleEditConfirm} // Pass edit confirm handler
        />
      )}
    </>
  );
}
