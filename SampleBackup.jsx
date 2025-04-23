import { Button, Col, Image, Row, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const loginImage = "https://sig1.co/img-twitter-1";
  const url =
    "https://auth-back-end-sigmaschooltech.sigma-school-full-stack.repl.co";

  // Possible values: null (no modal shows), "Login", "SignUp"
  const [modalShow, setModalShow] = useState(null);
  const handleShowSignUp = () => setModalShow("SignUp");
  const handleShowLogin = () => setModalShow("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useLocalStorage("authToken", "");

  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      navigate("/profile");
    }
  }, [authToken, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/signup`, { username, password });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/login`, { username, password });
      if (res.data && res.data.auth === true && res.data.token) {
        setAuthToken(res.data.token); // Save token to localStorage.
        console.log("Login was successful, token saved");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleClose = () => setModalShow(null);
  return (
    <Row>
      <Col sm={6}>
        <Image src={loginImage} fluid />
      </Col>
      <Col sm={6} className="p-4">
        <i
          className="bi bi-twitter"
          style={{ fontSize: 50, color: "dodgerblue" }}
        ></i>

        <p className="mt-5" style={{ fontSize: 64 }}>
          Happening Now
        </p>
        <h2 className="my-5" style={{ fontSize: 31 }}>
          Join Twitter today.
        </h2>
        <Col sm={5} className="d-grid gap-2">
          <Button className="rounded-pill" variant="outline-dark">
            <i className="bi bi-google"></i> Sign up with Google
          </Button>
          <Button className="rounded-pill" variant="outline-dark">
            <i className="bi bi-apple"></i> Sign up with Apple
          </Button>
          <p style={{ textAlign: "center" }}>or</p>
          <Button className="rounded-pill" onClick={handleShowSignUp}>
            Create an account
          </Button>
          <p style={{ fontSize: "12px" }}>
            By signing up, you agree to the Terms of Service and Privacy Policy,
            including Cookie Use.
          </p>

          <p className="mt-5" style={{ fontWeight: "bold" }}>
            Already have an account?
          </p>
          <Button
            className="rounded-pill"
            variant="outline-primary"
            onClick={handleShowLogin}
          >
            Sign in
          </Button>
        </Col>
        <Modal
          show={modalShow !== null}
          onHide={handleClose}
          animation={false}
          centered
        >
          <Modal.Body>
            <h2 className="mb-4" style={{ fontWeight: "bold" }}>
              {modalShow === "SignUp"
                ? "Create your account"
                : "Log in to your account"}
            </h2>
            <Form
              className="d-grid gap-2 px-5"
              onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  onChange={(e) => setUsername(e.target.value)}
                  type="email"
                  placeholder="Enter username"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <p style={{ fontSize: "12px" }}>
                By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use. SigmaTweets may use your contact
                information, including your email address and phone number for
                purposes outlined in our Privacy Policy, like keeping your
                account secure and personalising our services, including ads.
                Learn more. Others will be able to find you by email or phone
                number, when provided, unless you choose otherwise here.
              </p>

              <Button className="rounded-pill" type="submit">
                {modalShow === "SignUp" ? "Sign up" : "Log in"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Col>
    </Row>
  );
}

// backup layout code

// import bgImage from "../src/assets/background.jpeg";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import {Routes, Route} from "react-router-dom";
import HomePage from "../pages/HomePage";

export default function Layout({ handleLogout }) {
  return (
    <div
    //   style={{
    //     position: "relative",
    //     minHeight: "100vh",
    //     backgroundImage: `url(${bgImage})`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     zIndex: 1,
    //   }}
    >


      {/* Navbar will always appear on top */}
      <Navbar bg="dark" variant="dark" expand="lg" style={{ zIndex: 2 }}>
        <Container>
          <Navbar.Brand as={Link} to="/home">
            <i style={{ marginRight: "5px" }} className="bi bi-house-door"></i>
            Home
          </Navbar.Brand>

          <Navbar.Brand as={Link} to="/booking">
            <i
              style={{ marginRight: "5px" }}
              className="bi bi-person-workspace"
            ></i>
            Booking
          </Navbar.Brand>

          <Navbar.Brand as={Link} to="/contact">
            <i style={{ marginRight: "5px" }} className="bi bi-telephone"></i>
            Contact
          </Navbar.Brand>

          <Navbar.Brand as={Link} to="/about">
            <i style={{ marginRight: "5px" }} className="bi bi-info-circle"></i>
            About
          </Navbar.Brand>

          <Navbar.Brand as={Link} to="/login" onClick={handleLogout}>
            <i
              style={{ marginRight: "5px" }}
              className="bi bi-box-arrow-right"
            ></i>
            Logout
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Main content area */}
      <div style={{ zIndex: 2, position: "relative" }}>
        {/* Define your Routes here in one place */}
        {/* <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/booking" element={<UserBookings />} />
          <Route path="/login" element={<AuthPage />} />
        </Routes> */}
      </div>
    </div>
  );
}



// import { Card, Container, Row, Col, Button, Spinner } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import NewBookingModal from "../components/NewBookingModal";
// import { ref, listAll, getDownloadURL } from "firebase/storage";
// import { storage } from "../firebase";
// import axios from "axios";
// import "../App.css";

// export default function CarPage() {
//   const [cars, setCars] = useState([]);
//   const [carImages, setCarImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [make, setCarMake] = useState("");
//   const [carId, setCarId] = useState(null);
//   const [carPrice, setCarPrice] = useState(null);
//   const [show, setShow] = useState(false);

//   const handleCloseBookingModal = () => setShow(false);

//   const handleShowBookingModal = (title, id, price) => {
//     setCarMake(title);
//     setCarId(id);
//     setCarPrice(price);
//     setShow(true);
//   };

//   // Fetch car details from the API
//   const fetchCars = async () => {
//     try {
//       const response = await axios.get(
//         "https://car-booking-api.vercel.app/cars"
//       );
//       const carsFromApi = response.data.data;

//       const updatedCars = carsFromApi.map((car) => {
//         const matchedImage = carImages.find((img) => img.id === car.id);
//         return {
//           ...car,
//           image: matchedImage?.image || "",
//         };
//       });

//       setCars(updatedCars);
//     } catch (error) {
//       console.error("Error fetching cars:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch images from Firebase
//   const fetchImages = async () => {
//     try {
//       const storageRef = ref(storage, "carPics");
//       const result = await listAll(storageRef);
//       const imageUrls = await Promise.all(
//         result.items.map(async (itemRef) => {
//           const url = await getDownloadURL(itemRef);
//           return { name: itemRef.name, url };
//         })
//       );

//       // Sort the images by filename number (assuming 1.jpg, 2.jpg, etc.)
//       const sortedImages = imageUrls.sort((a, b) => {
//         const aNum = parseInt(a.name.split(".")[0]);
//         const bNum = parseInt(b.name.split(".")[0]);
//         return aNum - bNum;
//       });

//       // Create carPhotoFetch here
//       const newCarPhotoFetch = [
//         { id: 1, image: sortedImages[0]?.url },
//         { id: 2, image: sortedImages[1]?.url },
//         { id: 3, image: sortedImages[2]?.url },
//         { id: 4, image: sortedImages[3]?.url },
//         { id: 5, image: sortedImages[4]?.url },
//         { id: 6, image: sortedImages[5]?.url },
//         { id: 7, image: sortedImages[6]?.url },
//         { id: 8, image: sortedImages[7]?.url },
//       ];

//       setCarImages(newCarPhotoFetch);
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchImages(); // First fetch images
//       await fetchCars(); // Then fetch cars and match them with images
//     };
//     fetchData();
//   }, []);
//   // Empty dependency array to run effect only once

//   return (
//     <Container>
//       <Row className="justify-content-center" style={{ marginTop: "50px" }}>
//         {loading ? (
//           <Col
//             md={4}
//             className="d-flex justify-content-center align-items-center"
//             style={{ height: "100vh" }}
//           >
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           </Col>
//         ) : (
//           cars.map((car, index) => (
//             <Col md={3} key={car.id || index} style={{ marginTop: "50px" }}>
//               <Card
//                 className="rounded-5"
//                 style={{
//                   backgroundColor: "rgba(1, 1, 1, 0.5)",
//                   border: "none",
//                   marginLeft: "15px",
//                   marginRight: "15px",
//                 }}
//               >
//                 {/* Use the image URL here */}
//                 <Card.Img
//                   variant="top"
//                   src={car.image || "path_to_placeholder_image.jpg"}
//                   className="rounded-5"
//                 />
//                 <Card.Body>
//                   <Card.Title style={{ color: "white" }}>
//                     {car.make} {car.model} ({car.year})
//                   </Card.Title>
//                   <Card.Text style={{ color: "white" }}>
//                     RM {car.price_per_day} / day
//                   </Card.Text>
//                   <Button
//                     className="btn btn-primary"
//                     onClick={() =>
//                       handleShowBookingModal(
//                         `${car.make} ${car.model}`,
//                         car.id,
//                         car.price_per_day
//                       )
//                     }
//                   >
//                     Book Now
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))
//         )}
//       </Row>

//       <NewBookingModal
//         show={show}
//         handleClose={handleCloseBookingModal}
//         title={make}
//         carId={carId}
//         carPrice={carPrice}
//       />
//     </Container>
//   );
// }